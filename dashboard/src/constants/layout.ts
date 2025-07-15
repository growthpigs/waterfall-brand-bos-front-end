/**
 * Professional Services Layout Constants
 * Brand BOS - Authority Platform Design System
 */

export const LAYOUT = {
  // Sidebar dimensions
  sidebar: {
    expanded: 'w-80', // 320px
    collapsed: 'w-20', // 80px
    expandedPx: 320,
    collapsedPx: 80,
    headerHeight: '185px',
    navHeight: '690px',
    transition: 'transition-all duration-300 ease-in-out',
  },

  // Professional spacing system
  spacing: {
    gap: {
      desktop: '24px',
      tablet: '24px',
      mobile: '16px', // Optimized for small screens
      className: 'w-4 sm:w-6', // 16px mobile, 24px tablet+
    },
    content: {
      mobile: 'pl-4 pr-4',
      tablet: 'sm:pl-4 sm:pr-4',
      desktop: 'md:pl-0 md:pr-6',
      large: 'lg:pr-8',
    },
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  // Z-index hierarchy
  zIndex: {
    backgroundGradient: '-z-10',
    content: 'z-0',
    sidebarTrigger: 'z-30',
    mobileOverlay: 'z-40',
    sidebar: 'z-50',
    modal: 'z-60',
  },

  // Professional glassmorphic design
  glassmorphic: {
    sidebar: 'bg-white/5 backdrop-blur-md border-r border-white/20',
    card: 'bg-white/10 backdrop-blur-sm border border-white/10',
    button: 'bg-white/20 hover:bg-white/30',
    overlay: 'bg-black/50 backdrop-blur-sm',
  },

  // Animation standards
  animations: {
    sidebar: {
      enter: 'translate-x-0',
      exit: '-translate-x-full',
      desktop: 'md:translate-x-0',
    },
    hover: {
      scale: 'hover:scale-[1.02]',
      lift: 'hover:-translate-y-1',
    },
  },
} as const;

// Type-safe layout values
export type LayoutConfig = typeof LAYOUT;
