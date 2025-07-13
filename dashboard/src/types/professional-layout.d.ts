/**
 * Professional Services Layout Type Definitions
 * Brand BOS - 24px Standard Type System
 */

declare module '@brand-bos/professional-layout' {
  // Spacing value types
  export type ProfessionalSpacing = '24px';
  export type MobileSpacing = '16px';
  export type DesktopSpacing = '24px';
  
  // Sidebar dimension types
  export interface SidebarDimensions {
    expanded: {
      width: '320px';
      className: 'w-80';
      pixels: 320;
    };
    collapsed: {
      width: '80px';
      className: 'w-20';
      pixels: 80;
    };
  }
  
  // Layout system configuration
  export interface ProfessionalLayoutSystem {
    spacing: {
      gap: {
        value: ProfessionalSpacing;
        className: string;
        style: { width: ProfessionalSpacing };
      };
      sidebar: SidebarDimensions;
      content: {
        padding: {
          mobile: { left: string; right: string };
          desktop: { left: string; right: string };
          large: { left: string; right: string };
        };
      };
    };
    evidence: {
      gapImplementation: string;
      sidebarBehavior: string;
      contentSpacing: string;
    };
  }
  
  // Component prop types
  export interface Professional24pxLayoutProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
    themeGradient: string;
    pageId: string;
  }
  
  export interface ProfessionalGapProps {
    className?: string;
    showIndicator?: boolean;
  }
  
  // Theme gradient types
  export type ThemeGradient = 
    | 'from-purple-600 via-purple-700 to-indigo-800'   // Dashboard
    | 'from-blue-600 via-blue-700 to-navy-800'         // CIA
    | 'from-green-600 via-green-700 to-emerald-800'    // Content Engine
    | 'from-cyan-600 via-cyan-700 to-blue-800'         // Performance
    | 'from-pink-600 via-pink-700 to-purple-800'       // Campaign
    | 'from-orange-600 via-orange-700 to-red-800'      // Calendar
    | 'from-slate-600 via-slate-700 to-gray-800';      // Settings
  
  // Page ID types
  export type PageId = 
    | 'dashboard'
    | 'cia'
    | 'content'
    | 'calendar'
    | 'campaigns'
    | 'performance'
    | 'settings';
  
  // Layout measurement types
  export interface LayoutMeasurements {
    gap: {
      actual: number;
      expected: 24;
      isCorrect: boolean;
    };
    sidebar: {
      width: number;
      isExpanded: boolean;
    };
    viewport: {
      width: number;
      height: number;
      device: 'mobile' | 'tablet' | 'desktop';
    };
  }
  
  // Utility types
  export type ResponsiveValue<T> = {
    mobile: T;
    tablet?: T;
    desktop: T;
    large?: T;
  };
  
  export type LayoutBreakpoint = 'sm' | 'md' | 'lg' | 'xl';
  
  export type GlassmorphicStyle = {
    background: string;
    backdropFilter: string;
    border?: string;
  };
}

// Global type augmentation
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'professional-gap': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement> & {
          'data-gap': '24px-standard';
        },
        HTMLDivElement
      >;
    }
  }
  
  interface Window {
    __PROFESSIONAL_LAYOUT__: {
      verify24pxStandard: () => boolean;
      getMeasurements: () => import('@brand-bos/professional-layout').LayoutMeasurements;
    };
  }
}

export {};