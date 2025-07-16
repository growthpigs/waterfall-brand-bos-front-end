"""
Ticker API endpoints
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from uuid import UUID

from models.ticker import (
    TickerItem, TickerItemCreate, TickerFeedRequest,
    TickerFeedResponse, TickerCategory, TickerEngagementCreate
)
from services.ticker_service import ticker_service
from core.auth import get_current_user  # To be implemented

router = APIRouter()


@router.get("/feed", response_model=TickerFeedResponse)
async def get_ticker_feed(
    limit: int = Query(default=50, ge=1, le=200),
    categories: Optional[List[TickerCategory]] = Query(default=None),
    priority_filter: Optional[int] = Query(default=None, ge=1, le=5),
    include_expired: bool = Query(default=False),
    sort_by: str = Query(default="relevance", regex="^(relevance|created_at|priority)$"),
    # current_user = Depends(get_current_user)  # Uncomment when auth is implemented
):
    """
    Get mixed ticker feed from all categories.
    
    - **limit**: Maximum number of items to return (1-200)
    - **categories**: Filter by specific categories
    - **priority_filter**: Only show items with priority <= this value
    - **include_expired**: Include expired items
    - **sort_by**: Sort by relevance, created_at, or priority
    """
    request = TickerFeedRequest(
        limit=limit,
        categories=categories,
        priority_filter=priority_filter,
        include_expired=include_expired,
        sort_by=sort_by
    )
    
    # Get user_id when auth is implemented
    user_id = None  # current_user.id
    
    items = await ticker_service.get_ticker_feed(request, user_id)
    
    return TickerFeedResponse(
        items=items,
        total_count=len(items),
        has_more=len(items) == limit,
        last_updated=items[0].created_at if items else None
    )


@router.get("/general", response_model=List[TickerItem])
async def get_general_events(
    limit: int = Query(default=20, ge=1, le=100),
    background_tasks: BackgroundTasks = BackgroundTasks()
):
    """
    Get general events from external sources.
    Triggers background refresh if data is stale.
    """
    # Get cached general events
    request = TickerFeedRequest(
        limit=limit,
        categories=[TickerCategory.GENERAL],
        sort_by="created_at"
    )
    
    items = await ticker_service.get_ticker_feed(request)
    
    # Check if we need to refresh (if latest item is older than 15 minutes)
    if not items or (items[0].created_at < datetime.now() - timedelta(minutes=15)):
        background_tasks.add_task(ticker_service.fetch_general_events)
    
    return items


@router.get("/insights", response_model=List[TickerItem])
async def get_customized_insights(
    limit: int = Query(default=20, ge=1, le=100),
    # current_user = Depends(get_current_user)
):
    """
    Get AI-generated insights and suggestions for the current user.
    """
    # For now, return cached insights
    request = TickerFeedRequest(
        limit=limit,
        categories=[TickerCategory.INSIGHTS],
        sort_by="relevance"
    )
    
    # user_id = current_user.id
    user_id = None
    
    items = await ticker_service.get_ticker_feed(request, user_id)
    
    # TODO: Trigger insight generation if needed
    
    return items


@router.get("/performance", response_model=List[TickerItem])
async def get_performance_updates(
    limit: int = Query(default=20, ge=1, le=100),
    # current_user = Depends(get_current_user)
):
    """
    Get real-time performance updates and alerts.
    """
    request = TickerFeedRequest(
        limit=limit,
        categories=[TickerCategory.PERFORMANCE],
        sort_by="created_at"
    )
    
    # user_id = current_user.id
    user_id = None
    
    items = await ticker_service.get_ticker_feed(request, user_id)
    
    return items


@router.post("/refresh")
async def refresh_ticker_sources(
    background_tasks: BackgroundTasks,
    # current_user = Depends(get_current_user)
):
    """
    Manually trigger refresh of all ticker data sources.
    Requires admin privileges.
    """
    # TODO: Check admin privileges
    # if current_user.role != "admin":
    #     raise HTTPException(status_code=403, detail="Admin access required")
    
    # Add refresh task to background
    background_tasks.add_task(ticker_service.refresh_all_sources)
    
    return {
        "message": "Ticker refresh initiated",
        "status": "processing"
    }


@router.post("/items", response_model=TickerItem)
async def create_ticker_item(
    item: TickerItemCreate,
    # current_user = Depends(get_current_user)
):
    """
    Create a new ticker item (admin only).
    """
    # TODO: Check admin privileges
    # if current_user.role != "admin":
    #     raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        created_item = await ticker_service.create_ticker_item(item)
        return created_item
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/engagement")
async def track_engagement(
    engagement: TickerEngagementCreate,
    # current_user = Depends(get_current_user)
):
    """
    Track user engagement with ticker items.
    """
    # Ensure user can only track their own engagement
    # engagement.user_id = current_user.id
    
    try:
        # TODO: Implement engagement tracking
        return {"status": "tracked"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/stats")
async def get_ticker_stats(
    # current_user = Depends(get_current_user)
):
    """
    Get ticker system statistics (admin only).
    """
    # TODO: Check admin privileges
    # if current_user.role != "admin":
    #     raise HTTPException(status_code=403, detail="Admin access required")
    
    # TODO: Implement statistics gathering
    return {
        "total_items": 0,
        "active_items": 0,
        "sources": {
            "total": 0,
            "enabled": 0,
            "last_refresh": None
        },
        "categories": {
            "general": 0,
            "insights": 0,
            "performance": 0
        }
    }


# WebSocket endpoint for real-time updates (optional)
from fastapi import WebSocket, WebSocketDisconnect
from datetime import datetime, timedelta
import json


@router.websocket("/ws")
async def ticker_websocket(websocket: WebSocket):
    """
    WebSocket endpoint for real-time ticker updates.
    """
    await websocket.accept()
    
    try:
        # Send initial feed
        request = TickerFeedRequest(limit=20, sort_by="created_at")
        items = await ticker_service.get_ticker_feed(request)
        
        await websocket.send_json({
            "type": "initial",
            "items": [item.model_dump(mode="json") for item in items]
        })
        
        # Keep connection alive and send updates
        while True:
            # Wait for 30 seconds
            await asyncio.sleep(30)
            
            # Get new items created in last 30 seconds
            request = TickerFeedRequest(limit=10, sort_by="created_at")
            new_items = await ticker_service.get_ticker_feed(request)
            
            # Filter to only truly new items
            cutoff_time = datetime.now() - timedelta(seconds=35)
            new_items = [
                item for item in new_items 
                if item.created_at > cutoff_time
            ]
            
            if new_items:
                await websocket.send_json({
                    "type": "update",
                    "items": [item.model_dump(mode="json") for item in new_items]
                })
                
    except WebSocketDisconnect:
        logger.info("Ticker WebSocket disconnected")
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await websocket.close()


# Import required for background tasks
import asyncio
from datetime import datetime, timedelta
from loguru import logger