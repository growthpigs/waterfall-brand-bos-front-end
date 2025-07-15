# Professional Services Layout Standards
## Brand BOS Authority Platform Design System

### 🎯 Overview
This document defines the professional services layout standards for the Brand BOS platform, ensuring consistent, authority-building design across all applications.

### 📐 Layout Architecture

#### Spacing System
```
Mobile (<640px):    16px gap | Optimized for content
Tablet (640-768px): 24px gap | Professional standard
Desktop (768px+):   24px gap | Maintained consistency
```

#### Sidebar Dimensions
- **Expanded**: 320px (w-80)
- **Collapsed**: 80px (w-20)
- **Header Height**: 185px
- **Navigation Height**: 690px

### 🎨 Implementation Guide

#### 1. Using Layout Constants
```typescript
import { LAYOUT } from '@/constants/layout';

// Apply sidebar width
className={isCollapsed ? LAYOUT.sidebar.collapsed : LAYOUT.sidebar.expanded}

// Apply glassmorphic effects
className={LAYOUT.glassmorphic.sidebar}

// Apply z-index hierarchy
className={LAYOUT.zIndex.sidebar}
```

#### 2. Professional Gap Component
```tsx
import ProfessionalGap from '@/components/professional/ProfessionalGap';

// Automatically responsive: 16px mobile, 24px desktop
<ProfessionalGap />
```

#### 3. Complete Layout Wrapper
```tsx
import ProfessionalLayout from '@/components/professional/ProfessionalLayout';

<ProfessionalLayout 
  activePageId="dashboard"
  themeGradient="from-purple-600 via-purple-700 to-indigo-800"
  onNavigate={handleNavigate}
>
  {/* Your page content */}
</ProfessionalLayout>
```

### 🏢 Professional Services Standards

#### Authority Design Principles
1. **Generous Spacing**: Conveys quality and attention to detail
2. **Glassmorphic Effects**: Modern, trustworthy appearance
3. **Consistent Behavior**: Same experience across all devices
4. **Smooth Transitions**: Professional polish in interactions

#### Theme Colors by Application
- **Dashboard**: Purple → Indigo (Authority)
- **CIA Analysis**: Blue → Navy (Intelligence)
- **Content Engine**: Green → Emerald (Growth)
- **Performance**: Cyan → Blue (Analytics)
- **Campaign Control**: Pink → Purple (Creative)
- **Content Calendar**: Orange → Red (Energy)
- **Settings**: Slate → Gray (Professional)

### 📱 Responsive Behavior

#### Mobile Optimizations
- 16px gap for maximum content space
- Slide-out drawer navigation
- Touch-friendly tap targets (min 44px)
- Fixed hamburger menu button

#### Desktop Enhancements
- 24px professional gap standard
- Always-visible sidebar
- Hover states for interactivity
- Expanded navigation labels

### 🔧 CSS Custom Properties

```css
/* Professional spacing */
--spacing-gap-mobile: 16px;
--spacing-gap-desktop: 24px;

/* Glassmorphic effects */
--glass-bg-light: rgba(255, 255, 255, 0.05);
--glass-blur: 12px;

/* Authority colors */
--authority-trust: oklch(0.558 0.288 302.321);
```

### ✅ Checklist for New Pages

- [ ] Import layout constants from `@/constants/layout`
- [ ] Use ProfessionalLayout wrapper or individual components
- [ ] Apply theme-specific gradient background
- [ ] Implement responsive gap (16px mobile, 24px desktop)
- [ ] Test glassmorphic effects across themes
- [ ] Verify mobile menu functionality
- [ ] Ensure consistent z-index hierarchy
- [ ] Test all responsive breakpoints

### 🚀 Migration Guide

To update existing pages to professional standards:

1. Replace hardcoded spacing with ProfessionalGap component
2. Import and use LAYOUT constants for dimensions
3. Apply glassmorphic classes from constants
4. Test responsive behavior on all devices
5. Verify theme consistency

### 📊 Performance Considerations

- Use CSS custom properties for runtime theme switching
- Minimize DOM manipulations in sidebar animations
- Leverage transform instead of position for mobile menu
- Implement will-change for smooth transitions
- Use backdrop-filter responsibly (performance impact)

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Maintained By**: Brand BOS Frontend Team