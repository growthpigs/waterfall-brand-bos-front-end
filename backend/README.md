# Brand BOS Backend

## Overview
This is the backend API for Brand BOS - The Authority Avalanche Platform. Built with Python FastAPI, it provides high-performance async APIs for the CIA System, content management, and integrations.

## Quick Start

### 1. Run Setup Script
```bash
cd backend
python setup.py
```

### 2. Configure Environment
Update the `.env` file with your actual credentials:
- Supabase project URL and keys
- DataForSEO password (login already configured: eca1d1f1229a0603)
- API keys for integrations (GHL, Google Ads, OpenAI)
- Generate secret key: `openssl rand -hex 32`

### 3. Setup Database
1. Create a Supabase project at https://supabase.com
2. Run the schema SQL in your Supabase SQL editor: `database/schema.sql`

### 4. Run Development Server
```bash
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
python main.py
```

API will be available at: http://localhost:8000
Documentation at: http://localhost:8000/docs

## Project Structure
```
backend/
├── api/              # API endpoints
├── core/             # Core configuration and database
├── models/           # Pydantic models
├── services/         # Business logic
├── utils/            # Utility functions
├── tests/            # Test files
├── database/         # SQL schemas
├── main.py          # FastAPI application
└── requirements.txt  # Python dependencies
```

## Phase 1 Features (CIA System)
- CIA conversation management
- Multi-phase questionnaire flow
- AI-powered response analysis
- Lead qualification scoring
- Session archiving and insights

## API Endpoints

### Health Check
- `GET /` - Basic health check
- `GET /health` - Detailed health status

### CIA System (Coming Soon)
- `POST /api/cia/sessions` - Create new CIA session
- `GET /api/cia/sessions/{id}` - Get session details
- `POST /api/cia/sessions/{id}/responses` - Submit phase response
- `GET /api/cia/sessions/{id}/archive` - Get session archive

## Development

### Running Tests
```bash
pytest
```

### Code Formatting
```bash
black .
isort .
flake8
```

### Database Migrations
Supabase handles migrations through their dashboard. For local development:
1. Make schema changes in `database/schema.sql`
2. Run the SQL in Supabase SQL editor

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| SUPABASE_URL | Your Supabase project URL | Yes |
| SUPABASE_ANON_KEY | Supabase anonymous key | Yes |
| SUPABASE_SERVICE_KEY | Supabase service role key | Yes |
| DATAFORSEO_LOGIN | DataForSEO login (default: eca1d1f1229a0603) | Yes |
| DATAFORSEO_PASSWORD | DataForSEO password | Yes |
| SECRET_KEY | JWT secret key | Yes |
| OPENAI_API_KEY | OpenAI API key for CIA system | Yes |

## Security
- Row Level Security (RLS) enabled on all tables
- JWT authentication for API access
- User isolation for all data
- Secure password hashing with bcrypt

## Tech Stack
- **Framework**: FastAPI (async Python)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + JWT
- **AI/LLM**: OpenAI GPT-4
- **Validation**: Pydantic
- **Testing**: Pytest

## Support
For issues or questions, refer to the main project documentation or contact the development team.