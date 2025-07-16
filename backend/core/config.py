"""
Configuration management for Brand BOS backend
"""
from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import validator
import os
from pathlib import Path


class Settings(BaseSettings):
    """Application settings with environment variable support"""
    
    # Environment
    env: str = "development"
    debug: bool = True
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    
    # Database - Supabase
    supabase_url: str
    supabase_anon_key: str
    supabase_service_key: str
    
    # DataForSEO
    dataforseo_login: str = "eca1d1f1229a0603"
    dataforseo_password: str
    
    # GHL (GoHighLevel)
    ghl_api_key: Optional[str] = None
    ghl_location_id: Optional[str] = None
    
    # Google Ads
    google_ads_developer_token: Optional[str] = None
    google_ads_client_id: Optional[str] = None
    google_ads_client_secret: Optional[str] = None
    google_ads_refresh_token: Optional[str] = None
    google_ads_customer_id: Optional[str] = None
    
    # AI/LLM
    openai_api_key: Optional[str] = None
    anthropic_api_key: Optional[str] = None
    
    # Security
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # CORS
    cors_origins: List[str] = ["http://localhost:3001", "http://localhost:3000"]
    
    # Logging
    log_level: str = "INFO"
    log_file: str = "logs/app.log"
    
    @validator("cors_origins", pre=True)
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",")]
        return v
    
    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'
        case_sensitive = False


# Create settings instance
settings = Settings()

# Ensure log directory exists
log_dir = Path(settings.log_file).parent
log_dir.mkdir(exist_ok=True)

# CIA System Configuration
CIA_PHASES = {
    "phase1": {
        "name": "Rapport Building & Discovery",
        "prompts": [
            "Tell me about your business and what you're most proud of accomplishing.",
            "What's the biggest challenge you're facing right now?",
            "Where do you see your business in the next 12 months?"
        ]
    },
    "phase2": {
        "name": "Problem Identification",
        "prompts": [
            "What specific problems are preventing you from reaching your goals?",
            "How have you tried to solve this problem in the past?",
            "What would solving this problem mean for your business?"
        ]
    },
    "phase3": {
        "name": "Solution Exploration",
        "prompts": [
            "What kind of solution would work best for your situation?",
            "What's most important to you in choosing a solution?",
            "How would you measure success?"
        ]
    },
    "phase4": {
        "name": "Authority Building",
        "prompts": [
            "Based on what you've shared, here's how we've helped similar businesses...",
            "Let me show you our proven framework...",
            "Here are some results from clients in your industry..."
        ]
    },
    "phase5": {
        "name": "Next Steps",
        "prompts": [
            "What questions do you have about our approach?",
            "What would need to happen for you to move forward?",
            "Would you like to see how this would work specifically for your business?"
        ]
    }
}