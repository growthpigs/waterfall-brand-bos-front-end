/**
 * Professional Services Layout Component
 * Brand BOS - Authority Platform Professional Layout System
 */

import React from 'react';
import { motion } from 'framer-motion';

interface ProfessionalLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  theme?: 'orange' | 'green' | 'blue' | 'purple';
  className?: string;
}

const ProfessionalLayout: React.FC<ProfessionalLayoutProps> = ({
  children,
  sidebar,
  theme = 'orange',
  className = ''
}) => {
  const getThemeGradient = (theme: string) => {
    switch (theme) {
      case 'orange':
        return 'from-orange-600 via-orange-700 to-orange-800';
      case 'green':
        return 'from-green-600 via-green-700 to-green-800';
      case 'blue':
        return 'from-blue-600 via-blue-700 to-blue-800';
      case 'purple':
        return 'from-purple-600 via-purple-700 to-purple-800';
      default:
        return 'from-orange-600 via-orange-700 to-orange-800';
    }
  };

  return (
    <div className={`min-h-screen w-full flex bg-gradient-to-br ${getThemeGradient(theme)} ${className}`}>
      {/* Professional services gradient background */}
      <div className={`fixed inset-0 bg-gradient-to-br ${getThemeGradient(theme)} -z-10`} />
      
      {/* Left Sidebar */}
      <div className="flex-shrink-0 relative">
        {sidebar}
      </div>
      
      {/* Professional Services 24px Standard Gap */}
      <div className="flex-shrink-0" style={{ width: "24px" }} />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default ProfessionalLayout;