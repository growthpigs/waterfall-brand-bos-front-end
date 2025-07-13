# Menu Style Guide for Brand BOS

## Overview
This style guide documents the standardized menu structure based on the dashboard's SidebarNavigation component. All modules should follow this pattern for consistency.

## Menu Structure

### Dimensions and Layout
- **Expanded Width**: 320px (w-80)
- **Collapsed Width**: 80px (w-20)
- **Transition**: 300ms ease-in-out
- **Position**: Fixed left sidebar

### Header Section
- **Height**: 185px
- **Border**: Bottom only, 1.11111px solid with 20% opacity
- **Padding**: 24px (p-6)
- **Contains**: Collapse/expand toggle button

### Navigation Area
- **Padding**: 24px (p-6)
- **Height**: 690px
- **Item Spacing**: 8px between items (space-y-2)

### Navigation Items
- **Padding**: 
  - Horizontal: 16px (px-4) when expanded, 8px (px-2) when collapsed
  - Vertical: 12px top, 22px bottom
- **Border Radius**: 12px (rounded-xl)
- **Active State**: 
  - Background: white/20 with backdrop blur
  - Text: Full white
  - Shadow: lg
- **Hover State**:
  - Background: white/10
  - Text: Full white
  - Scale: 1.02
- **Default State**:
  - Text: white/70

### Icons
- **Size**: 20x20px (w-5 h-5)
- **Margin**: 12px right when expanded (mr-3)
- **Position**: Centered when collapsed

### Glass Morphism Effect
- **Background**: Gradient overlay
  - From: purple-600/30
  - Via: purple-700/40
  - To: purple-800/50
- **Backdrop Filter**: blur-md
- **Border**: Right side with purple-400/20

## Implementation Pattern

```tsx
// Standard menu structure
<aside className={`${isCollapsed ? 'w-20' : 'w-80'} flex flex-col relative transition-all duration-300 ease-in-out`}>
  {/* Glassmorphic overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-[COLOR]-600/30 via-[COLOR]-700/40 to-[COLOR]-800/50 backdrop-blur-md border-r border-[COLOR]-400/20" />
  
  {/* Content */}
  <div className="relative z-10 flex flex-col h-full">
    {/* Header */}
    <div className="p-6 border-b border-[COLOR]-400/20" style={{ height: "185px" }}>
      {/* Collapse toggle */}
    </div>
    
    {/* Navigation */}
    <nav className="flex-1 p-6">
      <ul className="space-y-2" style={{ height: "690px" }}>
        {/* Navigation items */}
      </ul>
    </nav>
  </div>
</aside>
```

## Color Variations by Module
- Replace `[COLOR]` placeholder with module-specific colors
- Maintain opacity values for consistency
- Text remains white/white-opacity across all variants

## Animation Standards
- **Hover**: scale(1.02) with 200ms duration
- **Tap**: scale(0.98)
- **Collapse/Expand**: 300ms transition on width
- **Motion**: Use framer-motion for all animations

## Responsive Behavior
- Mobile: Full-screen overlay when expanded
- Tablet+: Fixed sidebar as described above
- Always starts expanded on desktop, collapsed on mobile

## Accessibility
- Include title attributes when collapsed
- Maintain keyboard navigation
- ARIA labels for screen readers
- Focus indicators on interactive elements