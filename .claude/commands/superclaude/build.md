# /build - Brand BOS Component & Layout Builder

Build and rebuild components, layouts, and features for the Brand BOS professional services authority platform.

## Usage for Brand BOS Layout Fixes
```bash
/build --component "Sidebar" --layout-fix --persona-frontend --professional-services --magic
/build --layout --theme-consistent --persona-frontend --professional-services --c7
/build --component "Navigation" --professional-services --persona-frontend --magic
/build --feature "theme-system" --layout-consistency --persona-frontend --evidence
```

## Brand BOS Specific Build Types
- `--layout` - Layout structure and spacing fixes
- `--component "Name"` - Rebuild specific components
- `--theme-consistent` - Theme-independent layout building
- `--layout-fix` - Fix layout inconsistencies and spacing
- `--sidebar` - Sidebar component rebuilding
- `--navigation` - Navigation component improvements

## Authority Platform Build Flags
- `--authority-content` - Authority Avalanche content components
- `--testimonial` - Testimonial collection and display components
- `--professional-services` - Professional services UI patterns
- `--client-portal` - Client dashboard and portal features
- `--content-automation` - Content workflow automation

## Universal Personas for Brand BOS Building
- `--persona-frontend` - React/Next.js UI expertise (RECOMMENDED for layouts)
- `--persona-architect` - System and component architecture
- `--persona-mentor` - Authority Avalanche content strategy
- `--persona-performance` - Performance-optimized component building

## MCP Integration for Building
- `--c7` - React/Next.js and CSS best practices documentation
- `--magic` - Professional services UI component generation
- `--evidence` - Detailed explanations of build decisions

## Brand BOS Layout Building Patterns

### Sidebar Layout Fix
```bash
/build --component "Sidebar" --layout-fix --spacing-consistent --persona-frontend --professional-services --magic
```
**Builds:**
- Consistent background differentiation across all themes
- Standardized spacing between sidebar and main content
- Professional services appropriate visual hierarchy
- Theme-independent layout structure

### Theme System Standardization
```bash
/build --theme-system --layout-consistency --persona-frontend --professional-services --evidence
```
**Builds:**
- CSS variables for consistent spacing across themes
- Background contrast system for all color variations
- Professional services design token system
- Responsive layout that works with all themes

### Navigation Component Rebuild
```bash
/build --component "Navigation" --professional-services --responsive --persona-frontend --c7
```
**Builds:**
- Professional services appropriate navigation patterns
- Consistent styling across all theme colors
- Responsive navigation for mobile and desktop
- Authority platform appropriate user experience

## Component Building for Brand BOS

### Professional Services UI Components
```bash
/build --component "TestimonialCard" --authority-content --persona-frontend --magic
/build --component "ClientPortal" --professional-services --persona-frontend --c7
/build --component "AuthorityMetrics" --persona-performance --analytics --magic
```

### Layout Container Components
```bash
/build --component "LayoutContainer" --spacing-consistent --persona-frontend --professional-services
/build --component "SidebarLayout" --background-fix --persona-frontend --magic
/build --component "MainContent" --professional-services --persona-frontend --c7
```

### Authority Content Components
```bash
/build --component "ContentScheduler" --authority-content --persona-mentor --automation
/build --component "SuccessStory" --testimonial --persona-frontend --professional-services
/build --component "AuthorityDashboard" --persona-performance --analytics --c7
```

## Layout Building Process

### 1. Layout Analysis and Planning
- Analyze current layout issues and inconsistencies
- Plan consistent spacing and background system
- Design theme-independent layout structure
- Map professional services design requirements

### 2. Component Architecture Design
- Design consistent component structure
- Plan CSS organization and variable system
- Create reusable layout patterns
- Ensure professional services compliance

### 3. Implementation with Best Practices
- Apply React/Next.js best practices
- Implement consistent CSS architecture
- Use professional services design patterns
- Ensure responsive and accessible design

### 4. Testing and Validation
- Test layout consistency across all themes
- Validate professional services design standards
- Ensure responsive behavior on all devices
- Confirm accessibility compliance

## Example Layout Fixes

### Sidebar Background & Spacing Fix
```bash
/build --component "Sidebar" --layout-fix --background-spacing --persona-frontend --professional-services --evidence

Fixes Applied:
- Consistent background differentiation for all theme colors
- Standardized 24px spacing between sidebar and content
- Professional services visual hierarchy implementation
- Theme-independent CSS variable system
```

### Cross-Theme Layout Standardization
```bash
/build --layout --theme-consistent --spacing-standard --persona-frontend --professional-services --magic

Implementation:
- CSS custom properties for consistent spacing
- Background contrast system for all themes
- Professional services design token implementation
- Responsive layout optimization
```

## Building Output Format

### Component Build Report
```markdown
# Brand BOS Component Build Report

## Component Built: [Component Name]

## Build Summary
- **Component Type**: [Layout/UI/Authority Content]
- **Persona Applied**: [Frontend/Architect/Mentor]
- **Professional Services Compliance**: ✅ Met
- **Theme Consistency**: ✅ All themes supported

## Technical Implementation
### CSS Changes
```css
/* Theme-consistent spacing variables */
:root {
  --sidebar-spacing: 24px;
  --content-spacing: 32px;
  --sidebar-bg-contrast: var(--theme-surface);
}

/* Sidebar layout fix */
.sidebar {
  background: var(--sidebar-bg-contrast);
  margin-right: var(--sidebar-spacing);
  /* Additional consistent styling */
}
```

### React Component Updates
```jsx
// Consistent sidebar component structure
export const Sidebar = ({ theme }) => {
  return (
    <div className={`sidebar sidebar--${theme}`}>
      {/* Theme-independent content */}
    </div>
  );
};
```

## Issues Resolved
- ✅ Orange theme background differentiation implemented
- ✅ Consistent spacing across all theme colors
- ✅ Professional services visual hierarchy maintained
- ✅ Responsive layout behavior standardized

## Professional Services Compliance
- ✅ Clean, trustworthy professional appearance
- ✅ Consistent visual hierarchy and spacing
- ✅ Authority demonstration through design
- ✅ Mobile-optimized professional interface

## Authority Avalanche Integration
- ✅ Content display optimization for testimonials
- ✅ Authority measurement component integration
- ✅ Professional services workflow support
- ✅ Multi-channel content presentation ready

## Testing Results
- ✅ Layout consistent across orange, green, and all themes
- ✅ Professional services design standards met
- ✅ Responsive behavior verified on all devices
- ✅ Accessibility compliance validated
```

## Brand BOS Specific Building Standards

### Professional Services Requirements
- Clean, professional design that builds trust
- Consistent spacing and visual hierarchy
- Authority demonstration through layout quality
- Mobile-first responsive design for professionals

### Authority Avalanche Integration
- Content layout optimized for testimonial display
- Authority metrics presentation
- Professional services workflow integration
- Multi-channel content distribution support

### Technical Standards
- Theme-independent component architecture
- CSS custom properties for consistency
- Professional services accessibility compliance
- Performance-optimized layout implementation

This building command creates consistent, professional services appropriate components and layouts specifically designed for Brand BOS Authority Avalanche methodology implementation.