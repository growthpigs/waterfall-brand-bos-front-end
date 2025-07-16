"""
Ticker Service - Business logic for ticker system
"""
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from uuid import UUID
import asyncio
import httpx
from loguru import logger

from core.database import get_supabase, get_supabase_admin
from models.ticker import (
    TickerItem, TickerItemCreate, TickerCategory,
    TickerType, TickerFeedRequest, TickerInsight,
    PerformanceAlert, TickerSource
)


class TickerService:
    """Service for managing ticker feed data"""
    
    def __init__(self):
        self.supabase = get_supabase()
        self.admin_client = get_supabase_admin()
        
    async def get_ticker_feed(
        self, 
        request: TickerFeedRequest,
        user_id: Optional[UUID] = None
    ) -> List[TickerItem]:
        """Get mixed ticker feed with intelligent sorting"""
        try:
            # Build query
            query = self.supabase.table("ticker_items").select("*")
            
            # Apply filters
            query = query.eq("is_active", True)
            
            if not request.include_expired:
                query = query.or_(
                    "expires_at.is.null",
                    f"expires_at.gt.{datetime.now().isoformat()}"
                )
            
            if request.categories:
                query = query.in_("category", [cat.value for cat in request.categories])
            
            if request.priority_filter:
                query = query.lte("priority", request.priority_filter)
            
            # Sorting
            if request.sort_by == "created_at":
                query = query.order("created_at", desc=True)
            elif request.sort_by == "priority":
                query = query.order("priority").order("created_at", desc=True)
            
            # Execute query
            query = query.limit(request.limit)
            result = query.execute()
            
            items = [TickerItem(**item) for item in result.data]
            
            # Calculate relevance scores if sorting by relevance
            if request.sort_by == "relevance":
                items = await self._calculate_relevance_scores(items, user_id)
                items.sort(key=lambda x: x.relevance_score or 0, reverse=True)
            
            return items
            
        except Exception as e:
            logger.error(f"Error fetching ticker feed: {e}")
            return []
    
    async def create_ticker_item(self, item: TickerItemCreate) -> TickerItem:
        """Create a new ticker item"""
        try:
            result = self.admin_client.table("ticker_items").insert(
                item.model_dump()
            ).execute()
            
            return TickerItem(**result.data[0])
        except Exception as e:
            logger.error(f"Error creating ticker item: {e}")
            raise
    
    async def fetch_general_events(self) -> List[TickerItemCreate]:
        """Fetch general events from external sources"""
        items = []
        
        # Fetch from enabled sources
        sources = await self._get_enabled_sources("general")
        
        for source in sources:
            try:
                if source.source_name == "hacker_news":
                    hn_items = await self._fetch_hacker_news(source.config)
                    items.extend(hn_items)
                elif source.source_name == "tech_news":
                    news_items = await self._fetch_tech_news(source.config)
                    items.extend(news_items)
                
                # Update last fetch time
                await self._update_source_fetch_time(source.id, success=True)
                
            except Exception as e:
                logger.error(f"Error fetching from {source.source_name}: {e}")
                await self._update_source_fetch_time(source.id, success=False, error=str(e))
        
        return items
    
    async def generate_insights(self, user_id: UUID, context: Dict[str, Any]) -> List[TickerItemCreate]:
        """Generate AI-powered insights"""
        insights = []
        
        try:
            # Analyze user's campaign performance
            performance_insights = await self._analyze_performance_for_insights(user_id)
            
            # Generate content suggestions
            content_suggestions = await self._generate_content_suggestions(user_id, context)
            
            # Create optimization opportunities
            optimization_opps = await self._find_optimization_opportunities(user_id)
            
            # Convert to ticker items
            for insight in performance_insights + content_suggestions + optimization_opps:
                insights.append(TickerItemCreate(
                    category=TickerCategory.INSIGHTS,
                    title=insight.get("title", "New Insight"),
                    description=insight.get("description", ""),
                    icon_name=insight.get("icon", "Lightbulb"),
                    type=TickerType.INFO,
                    priority=insight.get("priority", 3),
                    source_data={
                        "insight_type": insight.get("type"),
                        "confidence": insight.get("confidence", 0.7),
                        "action_items": insight.get("action_items", [])
                    }
                ))
                
        except Exception as e:
            logger.error(f"Error generating insights: {e}")
        
        return insights
    
    async def fetch_performance_updates(self, user_id: UUID) -> List[TickerItemCreate]:
        """Fetch real-time performance updates"""
        updates = []
        
        try:
            # Get campaign performance alerts
            campaign_alerts = await self._check_campaign_performance(user_id)
            
            # Get content performance updates
            content_updates = await self._check_content_performance(user_id)
            
            # System health checks
            system_health = await self._check_system_health()
            
            # Convert to ticker items
            all_updates = campaign_alerts + content_updates + system_health
            
            for update in all_updates:
                ticker_type = TickerType.SUCCESS
                if update.get("severity") == "high":
                    ticker_type = TickerType.WARNING
                elif update.get("is_positive", True):
                    ticker_type = TickerType.SUCCESS
                else:
                    ticker_type = TickerType.UPDATE
                
                updates.append(TickerItemCreate(
                    category=TickerCategory.PERFORMANCE,
                    title=update.get("title", "Performance Update"),
                    description=update.get("description", ""),
                    icon_name=update.get("icon", "TrendingUp"),
                    type=ticker_type,
                    priority=update.get("priority", 3),
                    source_data={
                        "metric": update.get("metric"),
                        "value": update.get("value"),
                        "change": update.get("change"),
                        "timestamp": datetime.now().isoformat()
                    }
                ))
                
        except Exception as e:
            logger.error(f"Error fetching performance updates: {e}")
        
        return updates
    
    async def refresh_all_sources(self) -> Dict[str, Any]:
        """Manually refresh all ticker sources"""
        results = {
            "general": {"success": 0, "failed": 0},
            "insights": {"success": 0, "failed": 0},
            "performance": {"success": 0, "failed": 0}
        }
        
        try:
            # Fetch general events
            general_items = await self.fetch_general_events()
            for item in general_items:
                try:
                    await self.create_ticker_item(item)
                    results["general"]["success"] += 1
                except:
                    results["general"]["failed"] += 1
            
            # Note: Insights and performance would need user context
            # This is a simplified version for manual refresh
            
            # Clean up old items
            deleted = await self._cleanup_expired_items()
            results["cleanup"] = {"deleted": deleted}
            
        except Exception as e:
            logger.error(f"Error refreshing sources: {e}")
            results["error"] = str(e)
        
        return results
    
    # Private helper methods
    
    async def _calculate_relevance_scores(
        self, 
        items: List[TickerItem], 
        user_id: Optional[UUID]
    ) -> List[TickerItem]:
        """Calculate relevance scores for ticker items"""
        for item in items:
            # Base score from priority
            base_score = (6 - item.priority) * 20
            
            # Time decay
            age_hours = (datetime.now() - item.created_at).total_seconds() / 3600
            time_factor = 1 / (1 + age_hours / 24)
            
            # Engagement boost (if user_id provided)
            engagement_boost = 0
            if user_id:
                # Would query engagement table here
                engagement_boost = 0  # Placeholder
            
            item.relevance_score = base_score * time_factor + engagement_boost
        
        return items
    
    async def _get_enabled_sources(self, category: str) -> List[TickerSource]:
        """Get enabled ticker sources for a category"""
        try:
            result = self.supabase.table("ticker_sources").select("*").eq(
                "category", category
            ).eq("is_enabled", True).execute()
            
            return [TickerSource(**source) for source in result.data]
        except Exception as e:
            logger.error(f"Error fetching sources: {e}")
            return []
    
    async def _update_source_fetch_time(
        self, 
        source_id: UUID, 
        success: bool, 
        error: Optional[str] = None
    ):
        """Update source fetch statistics"""
        try:
            update_data = {
                "last_fetch_at": datetime.now().isoformat(),
                "fetch_count": self.supabase.rpc("increment", {"x": 1})
            }
            
            if success:
                update_data["last_success_at"] = datetime.now().isoformat()
            else:
                update_data["error_count"] = self.supabase.rpc("increment", {"x": 1})
                if error:
                    update_data["last_error"] = error[:500]  # Truncate error message
            
            self.admin_client.table("ticker_sources").update(
                update_data
            ).eq("id", str(source_id)).execute()
            
        except Exception as e:
            logger.error(f"Error updating source fetch time: {e}")
    
    async def _fetch_hacker_news(self, config: Dict[str, Any]) -> List[TickerItemCreate]:
        """Fetch items from Hacker News API"""
        items = []
        
        try:
            async with httpx.AsyncClient() as client:
                # Get top stories
                response = await client.get(
                    "https://hacker-news.firebaseio.com/v0/topstories.json"
                )
                story_ids = response.json()[:config.get("item_limit", 10)]
                
                # Fetch each story
                for story_id in story_ids:
                    story_response = await client.get(
                        f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json"
                    )
                    story = story_response.json()
                    
                    # Filter by keywords and score
                    if story.get("score", 0) >= config.get("min_score", 100):
                        # Check if any keyword matches
                        keywords = config.get("keywords", [])
                        title_lower = story.get("title", "").lower()
                        
                        if any(keyword.lower() in title_lower for keyword in keywords):
                            items.append(TickerItemCreate(
                                category=TickerCategory.GENERAL,
                                title=f"HN: {story.get('title', 'Untitled')[:100]}",
                                description=f"{story.get('score', 0)} points · {story.get('descendants', 0)} comments",
                                icon_name="TrendingUp",
                                type=TickerType.INFO,
                                priority=3,
                                source_data={
                                    "source": "hacker_news",
                                    "url": story.get("url"),
                                    "hn_id": story_id,
                                    "score": story.get("score", 0)
                                }
                            ))
        
        except Exception as e:
            logger.error(f"Error fetching from Hacker News: {e}")
        
        return items
    
    async def _fetch_tech_news(self, config: Dict[str, Any]) -> List[TickerItemCreate]:
        """Fetch tech news from News API"""
        # Placeholder - would implement News API integration
        return []
    
    async def _analyze_performance_for_insights(self, user_id: UUID) -> List[Dict[str, Any]]:
        """Analyze user's performance data for insights"""
        # Placeholder - would analyze actual campaign data
        return [
            {
                "title": "Campaign Performance Opportunity",
                "description": "Your CTR has increased 15% this week. Consider increasing budget for top performers.",
                "icon": "TrendingUp",
                "priority": 2,
                "type": "opportunity",
                "confidence": 0.85,
                "action_items": ["Review top campaigns", "Adjust budget allocation"]
            }
        ]
    
    async def _generate_content_suggestions(self, user_id: UUID, context: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Generate content suggestions based on user data"""
        # Placeholder - would use AI to generate suggestions
        return [
            {
                "title": "Content Gap Identified",
                "description": "Your audience engages most with video content. Consider creating more video testimonials.",
                "icon": "Video",
                "priority": 3,
                "type": "suggestion",
                "confidence": 0.75,
                "action_items": ["Plan video content", "Collect video testimonials"]
            }
        ]
    
    async def _find_optimization_opportunities(self, user_id: UUID) -> List[Dict[str, Any]]:
        """Find optimization opportunities"""
        # Placeholder - would analyze for optimization opportunities
        return []
    
    async def _check_campaign_performance(self, user_id: UUID) -> List[Dict[str, Any]]:
        """Check campaign performance metrics"""
        # Placeholder - would check actual campaign data
        return [
            {
                "title": "Campaign Alert: High Performance",
                "description": "Your 'Authority Building' campaign exceeded targets by 25%",
                "icon": "Award",
                "priority": 2,
                "severity": "low",
                "is_positive": True,
                "metric": "conversions",
                "value": 125,
                "change": 25
            }
        ]
    
    async def _check_content_performance(self, user_id: UUID) -> List[Dict[str, Any]]:
        """Check content performance metrics"""
        # Placeholder - would check actual content metrics
        return []
    
    async def _check_system_health(self) -> List[Dict[str, Any]]:
        """Check system health metrics"""
        # Placeholder - would check actual system health
        return []
    
    async def _cleanup_expired_items(self) -> int:
        """Clean up expired ticker items"""
        try:
            # Call the cleanup function in the database
            result = self.admin_client.rpc("cleanup_expired_ticker_items").execute()
            return result.data if result.data else 0
        except Exception as e:
            logger.error(f"Error cleaning up expired items: {e}")
            return 0


# Singleton instance
ticker_service = TickerService()