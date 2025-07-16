"""
CIA System Pydantic Models
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field, validator
from uuid import UUID, uuid4
from enum import Enum


class SessionStatus(str, Enum):
    """CIA Session status options"""
    ACTIVE = "active"
    COMPLETED = "completed"
    ABANDONED = "abandoned"


class ConversionLikelihood(str, Enum):
    """Conversion likelihood levels"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class AIModel(str, Enum):
    """Available AI models for CIA conversations"""
    GPT4 = "gpt-4"
    GPT35_TURBO = "gpt-3.5-turbo"
    CLAUDE = "claude"
    CLAUDE_INSTANT = "claude-instant"


# Base Models
class CIASessionBase(BaseModel):
    """Base model for CIA sessions"""
    lead_id: Optional[str] = None
    lead_name: Optional[str] = None
    lead_email: Optional[str] = None
    lead_phone: Optional[str] = None
    lead_company: Optional[str] = None
    ai_model: AIModel = AIModel.GPT4
    metadata: Dict[str, Any] = Field(default_factory=dict)


class CIASessionCreate(CIASessionBase):
    """Model for creating a new CIA session"""
    user_id: UUID


class CIASessionUpdate(BaseModel):
    """Model for updating a CIA session"""
    current_phase: Optional[int] = None
    status: Optional[SessionStatus] = None
    completed_at: Optional[datetime] = None
    metadata: Optional[Dict[str, Any]] = None


class CIASession(CIASessionBase):
    """Complete CIA session model"""
    id: UUID = Field(default_factory=uuid4)
    user_id: UUID
    current_phase: int = 1
    status: SessionStatus = SessionStatus.ACTIVE
    started_at: datetime
    completed_at: Optional[datetime] = None
    last_activity_at: datetime
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Phase Response Models
class PhaseResponseBase(BaseModel):
    """Base model for phase responses"""
    phase_number: int = Field(ge=1, le=5)
    phase_name: str
    question_prompt: str
    user_response: Optional[str] = None
    response_time_seconds: Optional[int] = None


class PhaseResponseCreate(PhaseResponseBase):
    """Model for creating a phase response"""
    session_id: UUID
    ai_analysis: Dict[str, Any] = Field(default_factory=dict)
    sentiment_score: Optional[float] = Field(None, ge=-1.0, le=1.0)
    keywords: List[str] = Field(default_factory=list)


class PhaseResponse(PhaseResponseBase):
    """Complete phase response model"""
    id: UUID = Field(default_factory=uuid4)
    session_id: UUID
    ai_analysis: Dict[str, Any]
    response_timestamp: datetime
    sentiment_score: Optional[float]
    keywords: List[str]
    created_at: datetime
    
    class Config:
        from_attributes = True


# Master Archive Models
class MasterArchiveBase(BaseModel):
    """Base model for master archives"""
    summary: str
    key_insights: Dict[str, Any] = Field(default_factory=dict)
    pain_points: List[str] = Field(default_factory=list)
    goals: List[str] = Field(default_factory=list)
    recommended_solutions: List[str] = Field(default_factory=list)
    follow_up_strategy: Optional[str] = None


class MasterArchiveCreate(MasterArchiveBase):
    """Model for creating a master archive"""
    session_id: UUID
    user_id: UUID
    authority_score: int = Field(default=0, ge=0, le=100)
    engagement_score: int = Field(default=0, ge=0, le=100)
    conversion_likelihood: Optional[ConversionLikelihood] = None


class MasterArchive(MasterArchiveBase):
    """Complete master archive model"""
    id: UUID = Field(default_factory=uuid4)
    session_id: UUID
    user_id: UUID
    authority_score: int
    engagement_score: int
    conversion_likelihood: Optional[ConversionLikelihood]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Template Models
class CIAPhaseTemplate(BaseModel):
    """Model for a single phase in a CIA template"""
    number: int = Field(ge=1, le=10)
    name: str
    prompts: List[str]
    description: Optional[str] = None


class CIATemplateBase(BaseModel):
    """Base model for CIA templates"""
    name: str
    description: Optional[str] = None
    industry: Optional[str] = None
    phases: List[CIAPhaseTemplate]
    
    @validator('phases')
    def validate_phases(cls, v):
        if len(v) < 3:
            raise ValueError("Template must have at least 3 phases")
        return v


class CIATemplateCreate(CIATemplateBase):
    """Model for creating a CIA template"""
    user_id: UUID
    is_default: bool = False


class CIATemplate(CIATemplateBase):
    """Complete CIA template model"""
    id: UUID = Field(default_factory=uuid4)
    user_id: UUID
    is_default: bool
    is_active: bool = True
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Response Models for API
class CIASessionResponse(BaseModel):
    """API response model for CIA session"""
    session: CIASession
    current_phase_responses: List[PhaseResponse] = Field(default_factory=list)
    archive: Optional[MasterArchive] = None


class CIAAnalysisRequest(BaseModel):
    """Request model for AI analysis of responses"""
    session_id: UUID
    phase_number: int
    user_response: str


class CIAAnalysisResponse(BaseModel):
    """Response model for AI analysis"""
    sentiment_score: float
    keywords: List[str]
    key_points: List[str]
    concerns: List[str]
    opportunities: List[str]
    recommended_next_action: str