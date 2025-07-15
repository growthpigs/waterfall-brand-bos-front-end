import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Target, FileText, Calendar, Rocket, BarChart3, Settings, Shield, Menu, X } from 'lucide-react';
import { LAYOUT } from '../../constants/layout';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'cia', label: 'CIA Analysis', icon: Shield },
  { id: 'content', label: 'Content Engine', icon: FileText },
  { id: 'calendar', label: 'Content Calendar', icon: Calendar },
  { id: 'campaigns', label: 'Campaign Center', icon: Rocket },
  { id: 'performance', label: 'Performance', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

interface ProfessionalSidebarNavigationProps {
  onNavigate?: (pageId: string) => void;
  activePageId?: string;
}

const ProfessionalSidebarNavigation: React.FC<ProfessionalSidebarNavigationProps> = ({ 
  onNavigate, 
  activePageId = 'dashboard' 
}) => {
  const [activeItem, setActiveItem] = useState(activePageId);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem('sidebar-collapsed');
      return saved ? JSON.parse(saved) : false;
    } catch (error) {
      console.error('Failed to read sidebar state from localStorage', error);
      return false;
    }
  });
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu on desktop resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= parseInt(LAYOUT.breakpoints.md)) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Persist sidebar state
  React.useEffect(() => {
    try {
      localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
    } catch (error) {
      console.error('Failed to persist sidebar state to localStorage', error);
    }
  }, [isCollapsed]);
  
  return <>
    {/* Mobile overlay with professional blur */}
    {isMobileMenuOpen && (
      <div 
        className={`fixed inset-0 ${LAYOUT.glassmorphic.overlay} ${LAYOUT.zIndex.mobileOverlay} md:hidden`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    )}
    
    {/* Professional Sidebar */}
    <aside className={`
      ${isCollapsed ? LAYOUT.sidebar.collapsed : LAYOUT.sidebar.expanded} 
      flex flex-col relative ${LAYOUT.sidebar.transition}
      md:relative md:translate-x-0
      ${isMobileMenuOpen ? 
        `fixed left-0 top-0 ${LAYOUT.zIndex.sidebar} ${LAYOUT.animations.sidebar.enter}` : 
        `fixed left-0 top-0 ${LAYOUT.zIndex.sidebar} ${LAYOUT.animations.sidebar.exit} ${LAYOUT.animations.sidebar.desktop}`}
      h-full md:h-auto
    `}>
      {/* Glassmorphic background */}
      <div className={`absolute inset-0 ${LAYOUT.glassmorphic.sidebar}`} />
      
      {/* Content layer */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header section */}
        <div className="p-6 border-b border-white/20" style={{ height: LAYOUT.sidebar.headerHeight }}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden flex items-center text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <Menu className="w-5 h-5" />
              <span className="text-sm font-medium ml-2">Menu</span>
            </button>
            
            {/* Desktop collapse button */}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)} 
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!isCollapsed}
              className={`hidden md:flex items-center text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 ${isCollapsed ? 'mx-auto' : ''} focus:outline-none focus:ring-2 focus:ring-white`}
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
        <nav className={`flex-1 ${isCollapsed ? 'px-2 py-6' : 'p-6'}`} style={{ height: LAYOUT.sidebar.navHeight }} aria-label="Sidebar navigation">
          <ul role="tablist" className="space-y-2">
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <li key={item.id}>
                  <motion.button 
                    role="tab"
                    aria-selected={isActive}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => {
                      setActiveItem(item.id);
                      onNavigate?.(item.id);
                      setIsMobileMenuOpen(false);
                    }} 
                    className={`
                      ${isCollapsed ? 
                        `w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 mx-auto` :
                        `w-full h-12 flex items-center px-4 justify-start rounded-xl text-left transition-all duration-200 overflow-hidden`
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
      aria-label="Open mobile menu"
      aria-expanded={isMobileMenuOpen}
      className={`md:hidden fixed top-4 left-4 ${LAYOUT.zIndex.sidebarTrigger} ${LAYOUT.glassmorphic.button} border border-white/10 rounded-lg p-2 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white`}
    >
      <Menu className="w-5 h-5" />
    </button>
  </>;
};

export default ProfessionalSidebarNavigation;