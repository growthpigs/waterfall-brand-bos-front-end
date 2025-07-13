# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `yarn dev` - Start development server (Vite)
- `yarn build` - Build for production (TypeScript check + Vite build)
- `yarn preview` - Preview production build locally

### Code Quality
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting without changing files

## Architecture Overview

This is a multi-module React + TypeScript frontend for Brand BOS (Brand Building Operating System). The project uses a modular structure where each major feature has its own directory:

### Module Structure
- **CIA/** - CIA Analysis functionality
- **Campaign Control/** - Campaign management features  
- **Content Calendar/** - Content scheduling tools
- **Content Engine/** - Content creation workspace
- **Performance/** - Analytics and performance tracking
- **Settings/** - Application settings
- **dashboard/** - Main dashboard and overview
- **Floating Chat & Ticker/** - Chat interface components

Each module is a standalone Vite project with:
- Independent package.json and dependencies
- Shared component patterns in `src/components/generated/`
- Common configuration (vite.config.ts, tsconfig.json)

### Technology Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **UI Components**: shadcn/ui (configured via components.json)
- **Styling**: Tailwind CSS 4 with CSS variables
- **State Management**: React hooks and context
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **3D Graphics**: Three.js with React Three Fiber

### Key Patterns
- Components are generated in `src/components/generated/`
- UI components from shadcn are imported as needed
- Path aliases: `@/` maps to `./src/`
- Dark mode support via `next-themes`
- TypeScript strict mode enabled
- ESLint configured with React hooks rules

### Component Architecture
- Pages are top-level components (e.g., BrandBOSDashboard, CIAAnalysisPage)
- Shared navigation via SidebarNavigation component
- Consistent UI elements: FloatingChatBubble, NotificationBubbles, PersistentChatBar
- Responsive design using custom `use-mobile` hook

## Important Notes
- Each module can be developed independently but shares common UI patterns
- The main App.tsx switches between generated components
- Theme is controlled via document class ('dark' class for dark mode)
- All generated components follow consistent naming patterns