import React from 'react';
import ProfessionalSidebarNavigation from './ProfessionalSidebarNavigation';
import ProfessionalGap from './ProfessionalGap';
import { LAYOUT } from '../../constants/layout';

interface ProfessionalLayoutProps {
  children: React.ReactNode;
  activePageId: string;
  onNavigate?: (pageId: string) => void;
  themeGradient: string; // e.g., "from-purple-600 via-purple-700 to-indigo-800"
}

/**
 * Professional Services Layout Wrapper
 * Ensures consistent layout across all Brand BOS applications
 * - Standardized sidebar behavior
 * - Responsive gap optimization
 * - Theme-independent structure
 * - Professional glassmorphic design
 */
const ProfessionalLayout: React.FC<ProfessionalLayoutProps> = ({
  children,
  activePageId,
  onNavigate,
  themeGradient
}) => {
  return (
    <div className="min-h-screen w-full flex">
      {/* Theme gradient background */}
      <div className={`fixed inset-0 bg-gradient-to-br ${themeGradient} ${LAYOUT.zIndex.backgroundGradient}`} />
      
      {/* Professional Sidebar */}
      <ProfessionalSidebarNavigation 
        onNavigate={onNavigate} 
        activePageId={activePageId} 
      />
      
      {/* Responsive Gap (16px mobile, 24px desktop) */}
      <ProfessionalGap />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative min-h-screen">
        <div className={`
          flex-1 
          ${LAYOUT.spacing.content.mobile} 
          ${LAYOUT.spacing.content.desktop} 
          ${LAYOUT.spacing.content.large} 
          pt-6 sm:pt-8 pb-6 sm:pb-8 
          overflow-auto
        `}>
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-0">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalLayout;