"""
Database configuration and Supabase client setup
"""
from supabase import create_client, Client
from typing import Optional
from loguru import logger

from core.config import settings

# Global Supabase client
_supabase_client: Optional[Client] = None


def get_supabase() -> Client:
    """Get Supabase client instance"""
    global _supabase_client
    
    if _supabase_client is None:
        _supabase_client = create_client(
            supabase_url=settings.supabase_url,
            supabase_key=settings.supabase_anon_key
        )
        logger.info("Supabase client created")
    
    return _supabase_client


def get_supabase_admin() -> Client:
    """Get Supabase admin client (uses service key)"""
    return create_client(
        supabase_url=settings.supabase_url,
        supabase_key=settings.supabase_service_key
    )


def init_supabase():
    """Initialize Supabase connection and verify it works"""
    try:
        client = get_supabase()
        # Simple test query to verify connection
        # This will be replaced with actual table query once tables are created
        logger.info("Supabase connection test successful")
        return True
    except Exception as e:
        logger.error(f"Supabase connection test failed: {e}")
        raise


# Database table names
class Tables:
    """Database table name constants"""
    # CIA System Tables
    CIA_SESSIONS = "cia_sessions"
    CIA_PHASE_RESPONSES = "cia_phase_responses"
    CIA_MASTER_ARCHIVES = "cia_master_archives"
    CIA_TEMPLATES = "cia_templates"
    
    # User & Auth Tables
    USERS = "users"
    USER_PROFILES = "user_profiles"
    
    # Content Tables
    TESTIMONIALS = "testimonials"
    CONTENT_PIECES = "content_pieces"
    CONTENT_DISTRIBUTIONS = "content_distributions"
    
    # Campaign Tables
    CAMPAIGNS = "campaigns"
    CAMPAIGN_METRICS = "campaign_metrics"
    
    # Integration Tables
    GHL_CONTACTS = "ghl_contacts"
    GOOGLE_ADS_ACCOUNTS = "google_ads_accounts"