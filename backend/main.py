"""
Brand BOS Backend API - Main Entry Point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
from loguru import logger

from core.config import settings
from core.database import init_supabase

# Import routers
from api.ticker import router as ticker_router
# from api.cia import router as cia_router
# from api.auth import router as auth_router
# from api.content import router as content_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events"""
    # Startup
    logger.info("Starting Brand BOS Backend...")
    logger.info(f"Environment: {settings.env}")
    logger.info(f"Debug Mode: {settings.debug}")
    
    # Initialize Supabase connection
    try:
        init_supabase()
        logger.info("Supabase connection initialized")
    except Exception as e:
        logger.error(f"Failed to initialize Supabase: {e}")
    
    yield
    
    # Shutdown
    logger.info("Shutting down Brand BOS Backend...")


# Create FastAPI app
app = FastAPI(
    title="Brand BOS Backend",
    description="Backend API for Brand BOS - Authority Avalanche Platform",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logger.add(
    settings.log_file,
    rotation="500 MB",
    retention="10 days",
    level=settings.log_level
)


# Root endpoint
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Brand BOS Backend",
        "version": "1.0.0",
        "environment": settings.env
    }


@app.get("/health")
async def health_check():
    """Detailed health check"""
    health_status = {
        "status": "healthy",
        "checks": {
            "api": "operational",
            "database": "unknown",  # Will be updated when DB check is implemented
            "integrations": {
                "dataforseo": "configured" if settings.dataforseo_password else "not_configured",
                "ghl": "configured" if settings.ghl_api_key else "not_configured",
                "google_ads": "configured" if settings.google_ads_developer_token else "not_configured",
                "openai": "configured" if settings.openai_api_key else "not_configured"
            }
        }
    }
    return health_status


# Include routers
app.include_router(ticker_router, prefix="/api/ticker", tags=["Ticker Feed"])
# app.include_router(cia_router, prefix="/api/cia", tags=["CIA System"])
# app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
# app.include_router(content_router, prefix="/api/content", tags=["Content"])


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level=settings.log_level.lower()
    )