/**
 * Professional Services Sidebar Component
 * Brand BOS - Authority Platform Professional Sidebar System
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

interface ProfessionalSidebarProps {
  navigationItems: NavItem[];
  onNavigate?: (pageId: string) => void;
  activePageId?: string;
  className?: string;
}

const ProfessionalSidebar: React.FC<ProfessionalSidebarProps> = ({
  navigationItems,
  onNavigate,
  activePageId = 'dashboard',
  className = ''
}) => {
  const [activeItem, setActiveItem] = useState(activePageId);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('professional-sidebar-collapsed');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback if saved value is corrupted or not valid JSON
        return false;
      }
    }
    return false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on desktop resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Persist sidebar state
  React.useEffect(() => {
    localStorage.setItem('professional-sidebar-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const sidebarWidth = isCollapsed ? 'w-20' : 'w-80';
  const sidebarTransition = 'transition-all duration-300 ease-in-out';

  return (
    <>
      {/* Mobile overlay with professional blur */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Professional Sidebar */}
      <aside className={`
        ${sidebarWidth} 
        flex flex-col relative ${sidebarTransition}
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 
          'fixed left-0 top-0 z-50 translate-x-0' : 
          'fixed left-0 top-0 z-50 -translate-x-full md:translate-x-0'}
        h-full md:h-auto ${className}
      `}>
        {/* Glassmorphic background */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md border-r border-white/20" />
        
        {/* Content layer */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header section */}
          <div className="p-6 border-b border-white/20">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
              {/* Mobile menu button removed to avoid duplication with floating trigger */}
              
              {/* Desktop collapse button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`hidden md:flex items-center text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 ${isCollapsed ? 'mx-auto' : ''}`}
              >
                {isCollapsed ? <Menu className="w-5 h-5" /> : (
                  <>
                    <X className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Collapse</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Navigation items */}
          <nav className={`flex-1 ${isCollapsed ? 'px-2 py-6' : 'p-6'} overflow-y-auto`}>
            <ul className="space-y-2">
              {navigationItems.map(item => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <li key={item.id}>
                    <motion.button
                      onClick={() => {
                        setActiveItem(item.id);
                        onNavigate?.(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        ${isCollapsed ? 
                          'w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 mx-auto' :
                          'w-full h-12 flex items-center px-4 justify-start rounded-xl text-left transition-all duration-200 overflow-hidden'
                        }
                        ${isActive ? 
                          'bg-white/20 text-white shadow-lg backdrop-blur-sm' : 
                          'text-white/70 hover:text-white hover:bg-white/10'
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
                      {!isCollapsed && (
                        <span className="font-medium flex-1 truncate">
                          {item.label}
                        </span>
                      )}
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
      
      {/* Mobile menu trigger - Professional floating button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/10 rounded-lg p-2 text-white/80 hover:text-white transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
};

export default ProfessionalSidebar;