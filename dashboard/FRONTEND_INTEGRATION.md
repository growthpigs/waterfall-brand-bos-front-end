# Frontend Integration Guide for Brand BOS

## Overview
This document outlines the frontend structure and integration points for connecting with the V1 Waterfall backend.

## Current Frontend Structure

### Pages and Routes
The frontend is organized as a single-page application with the following main sections:

1. **Dashboard** (`/`) - Main overview page
2. **Brand Intelligence** (`/intelligence`) - On-demand analysis, weekly opportunities, monthly reports
3. **CIA Analysis** (`/cia`) - 6-phase intelligence gathering system
4. **Content Engine** (`/content`) - 12+ format content generation
5. **Content Calendar** (`/calendar`) - Content scheduling
6. **Campaign Center** (`/campaigns`) - Campaign management
7. **Performance** (`/performance`) - Analytics and tracking
8. **Settings** (`/settings`) - User and system configuration

### Navigation System
- Collapsible sidebar with icon/text modes
- Consistent navigation across all pages
- Active page highlighting
- Module-specific color themes

## Backend Integration Points

### 1. CIA System Integration

#### API Endpoints Needed:
```typescript
// CIA Session Management
POST   /api/cia/sessions - Create new CIA analysis session
GET    /api/cia/sessions/:id - Get session status and results
POST   /api/cia/sessions/:id/phases/:phaseId - Execute specific phase
GET    /api/cia/sessions/:id/archives - Get master archives

// Human-in-Loop Workflows
POST   /api/cia/sessions/:id/human-input - Submit manual data (DataForSEO, Perplexity)
GET    /api/cia/sessions/:id/pending-inputs - Check for required inputs
```

#### Frontend Components:
- `CIAAnalysisPage` - Main interface for CIA operations
- Phase progress tracking UI
- Human input forms for manual data entry
- Archive viewer for intelligence results

### 2. Content Engine Integration

#### API Endpoints Needed:
```typescript
// Convergence Detection
GET    /api/content/convergence/weekly - Get weekly viral opportunities
POST   /api/content/convergence/select - Select opportunity for content generation

// Content Generation
POST   /api/content/clusters - Create new content cluster
GET    /api/content/clusters/:id - Get cluster details and formats
POST   /api/content/clusters/:id/generate - Generate content for specific formats
PUT    /api/content/clusters/:id/formats - Toggle format enable/disable

// Publishing
POST   /api/content/publish/notion - Publish to Notion
POST   /api/content/publish/social - Publish to social platforms via GHL
GET    /api/content/publish/status/:id - Check publishing status
```

#### Frontend Components:
- `ContentEnginePage` - Format grid and publishing controls
- Content format toggle system
- Publishing pipeline visualization
- Real-time status updates

### 3. Brand Intelligence Integration

#### API Endpoints Needed:
```typescript
// Quick Intelligence (On-Demand)
POST   /api/intelligence/analyze - Start new analysis
GET    /api/intelligence/analysis/:id - Get analysis results

// Weekly Intelligence
GET    /api/intelligence/weekly/opportunities - Get this week's opportunities
POST   /api/intelligence/weekly/select - Select opportunity

// Monthly Deep Dive
GET    /api/intelligence/monthly/status - Get deep dive status
POST   /api/intelligence/monthly/trigger - Trigger monthly analysis
```

### 4. Authentication & Multi-Tenancy

#### API Endpoints Needed:
```typescript
// Auth
POST   /api/auth/login - User login
POST   /api/auth/logout - User logout
GET    /api/auth/me - Get current user/client info

// Client Management
GET    /api/clients - List available clients (for agency users)
POST   /api/clients/switch - Switch active client context
```

#### Frontend Requirements:
- JWT token storage and management
- Client context switcher UI
- Role-based access control
- Session persistence

### 5. Real-Time Updates

#### WebSocket Events:
```typescript
// CIA Progress Updates
cia:phase:started
cia:phase:completed
cia:phase:failed
cia:human-input:required

// Content Generation Updates
content:generation:started
content:generation:progress
content:generation:completed
content:publishing:status

// Notifications
notification:slack:sent
notification:email:sent
```

### 6. Configuration Management

#### API Endpoints Needed:
```typescript
// Client Configuration
GET    /api/config/client - Get client-specific settings
PUT    /api/config/client - Update client settings
GET    /api/config/formats - Get enabled content formats
PUT    /api/config/formats - Update format preferences

// Notification Settings
GET    /api/config/notifications - Get notification preferences
PUT    /api/config/notifications - Update notification settings
```

## State Management Recommendations

### Global State Needs:
1. **User/Client Context** - Current user and active client
2. **CIA Session State** - Active analysis sessions and progress
3. **Content Pipeline State** - Current clusters and generation status
4. **Notification Queue** - System notifications and alerts

### Suggested Implementation:
- React Context for global state
- Custom hooks for API interactions
- Optimistic UI updates with rollback
- Local caching for performance

## Environment Variables

```env
# Backend API
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws

# Feature Flags
VITE_ENABLE_CIA=true
VITE_ENABLE_CONTENT_ENGINE=true
VITE_ENABLE_ADSBY=false

# External Services
VITE_GLIF_API_KEY=your_glif_key
```

## Next Steps for Backend Integration

1. **Set up API client** with axios/fetch wrapper
2. **Implement authentication flow** with JWT handling
3. **Create API hooks** for each major feature area
4. **Add WebSocket connection** for real-time updates
5. **Implement error handling** and retry logic
6. **Add loading states** and progress indicators
7. **Create data persistence layer** for offline support

## Testing Considerations

- Mock API responses for development
- Integration tests for API endpoints
- E2E tests for critical workflows
- Performance testing for large data sets
- Multi-tenant isolation testing