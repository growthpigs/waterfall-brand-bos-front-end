"""
Ticker System Pydantic Models
"""
from typing import List, Optional, Dict, Any, Literal
from datetime import datetime
from pydantic import BaseModel, Field, validator
from uuid import UUID, uuid4
from enum import Enum


class TickerCategory(str, Enum):
    """Ticker content categories"""
    GENERAL = "general"
    INSIGHTS = "insights"
    PERFORMANCE = "performance"


class TickerType(str, Enum):
    """Ticker item types for visual styling"""
    SUCCESS = "success"
    INFO = "info"
    WARNING = "warning"
    UPDATE = "update"


class TickerAction(str, Enum):
    """User engagement actions"""
    VIEW = "view"
    CLICK = "click"
    DISMISS = "dismiss"
    SHARE = "share"


class SourceType(str, Enum):
    """Ticker source types"""
    API = "api"
    RSS = "rss"
    WEBHOOK = "webhook"
    INTERNAL = "internal"


# Ticker Item Models
class TickerItemBase(BaseModel):
    """Base model for ticker items"""
    category: TickerCategory
    title: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1, max_length=500)
    icon_name: str = Field(default="Info")
    type: TickerType = Field(default=TickerType.INFO)
    priority: int = Field(ge=1, le=5, default=3)
    source_data: Dict[str, Any] = Field(default_factory=dict)
    expires_at: Optional[datetime] = None


class TickerItemCreate(TickerItemBase):
    """Model for creating a ticker item"""
    is_active: bool = True


class TickerItemUpdate(BaseModel):
    """Model for updating a ticker item"""
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[int] = Field(None, ge=1, le=5)
    is_active: Optional[bool] = None
    expires_at: Optional[datetime] = None


class TickerItem(TickerItemBase):
    """Complete ticker item model"""
    id: UUID = Field(default_factory=uuid4)
    is_active: bool = True
    created_at: datetime
    updated_at: datetime
    relevance_score: Optional[float] = None
    
    class Config:
        from_attributes = True


# Ticker Source Models
class TickerSourceBase(BaseModel):
    """Base model for ticker sources"""
    category: str
    source_name: str = Field(min_length=1, max_length=100)
    source_type: SourceType
    endpoint_url: Optional[str] = None
    api_key_name: Optional[str] = None
    refresh_interval_minutes: int = Field(ge=1, le=1440, default=30)
    config: Dict[str, Any] = Field(default_factory=dict)


class TickerSourceCreate(TickerSourceBase):
    """Model for creating a ticker source"""
    is_enabled: bool = True


class TickerSourceUpdate(BaseModel):
    """Model for updating a ticker source"""
    endpoint_url: Optional[str] = None
    refresh_interval_minutes: Optional[int] = Field(None, ge=1, le=1440)
    is_enabled: Optional[bool] = None
    config: Optional[Dict[str, Any]] = None


class TickerSource(TickerSourceBase):
    """Complete ticker source model"""
    id: UUID = Field(default_factory=uuid4)
    is_enabled: bool = True
    last_fetch_at: Optional[datetime] = None
    last_success_at: Optional[datetime] = None
    fetch_count: int = 0
    error_count: int = 0
    last_error: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# User Preference Models
class TickerPreferencesBase(BaseModel):
    """Base model for ticker preferences"""
    enabled_categories: List[TickerCategory] = Field(
        default=[TickerCategory.GENERAL, TickerCategory.INSIGHTS, TickerCategory.PERFORMANCE]
    )
    priority_threshold: int = Field(ge=1, le=5, default=5)
    custom_filters: Dict[str, Any] = Field(default_factory=dict)


class TickerPreferencesCreate(TickerPreferencesBase):
    """Model for creating ticker preferences"""
    user_id: UUID


class TickerPreferencesUpdate(BaseModel):
    """Model for updating ticker preferences"""
    enabled_categories: Optional[List[TickerCategory]] = None
    priority_threshold: Optional[int] = Field(None, ge=1, le=5)
    custom_filters: Optional[Dict[str, Any]] = None


class TickerPreferences(TickerPreferencesBase):
    """Complete ticker preferences model"""
    id: UUID = Field(default_factory=uuid4)
    user_id: UUID
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Engagement Models
class TickerEngagementCreate(BaseModel):
    """Model for creating engagement record"""
    user_id: UUID
    ticker_item_id: UUID
    action: TickerAction
    metadata: Dict[str, Any] = Field(default_factory=dict)


class TickerEngagement(BaseModel):
    """Complete engagement model"""
    id: UUID = Field(default_factory=uuid4)
    user_id: UUID
    ticker_item_id: UUID
    action: TickerAction
    action_timestamp: datetime
    metadata: Dict[str, Any]
    
    class Config:
        from_attributes = True


# API Response Models
class TickerFeedResponse(BaseModel):
    """Response model for ticker feed"""
    items: List[TickerItem]
    total_count: int
    has_more: bool
    last_updated: datetime


class TickerInsight(BaseModel):
    """Model for AI-generated insights"""
    insight_type: Literal["suggestion", "opportunity", "trend", "alert"]
    confidence_score: float = Field(ge=0, le=1)
    action_items: List[str] = Field(default_factory=list)
    related_metrics: Dict[str, Any] = Field(default_factory=dict)


class PerformanceAlert(BaseModel):
    """Model for performance alerts"""
    metric_name: str
    current_value: float
    previous_value: float
    change_percentage: float
    threshold_exceeded: bool
    severity: Literal["low", "medium", "high"]
    recommended_action: Optional[str] = None


# Request Models
class TickerFeedRequest(BaseModel):
    """Request model for ticker feed"""
    limit: int = Field(default=50, ge=1, le=200)
    categories: Optional[List[TickerCategory]] = None
    priority_filter: Optional[int] = Field(None, ge=1, le=5)
    include_expired: bool = False
    sort_by: Literal["relevance", "created_at", "priority"] = "relevance"


class GenerateInsightsRequest(BaseModel):
    """Request model for generating insights"""
    user_id: UUID
    context_data: Dict[str, Any] = Field(default_factory=dict)
    insight_types: List[str] = Field(
        default=["suggestion", "opportunity", "trend"]
    )
    max_insights: int = Field(default=5, ge=1, le=20)