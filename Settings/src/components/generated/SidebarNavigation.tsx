import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Target, FileText, Calendar, Rocket, BarChart3, Settings, ChevronLeft, Shield, Menu, X } from 'lucide-react';
interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  active?: boolean;
}
const navigationItems: NavItem[] = [{
  id: 'dashboard',
  label: 'Dashboard',
  icon: Home,
  active: false
}, {
  id: 'cia',
  label: 'CIA Analysis',
  icon: Shield,
  active: true
}, {
  id: 'content',
  label: 'Content Engine',
  icon: FileText
}, {
  id: 'calendar',
  label: 'Content Calendar',
  icon: Calendar
}, {
  id: 'campaigns',
  label: 'Campaign Center',
  icon: Rocket
}, {
  id: 'performance',
  label: 'Performance',
  icon: BarChart3
}, {
  id: 'settings',
  label: 'Settings',
  icon: Settings
}];
interface SidebarNavigationProps {
  onNavigate?: (pageId: string) => void;
  activePageId?: string;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ onNavigate, activePageId = 'dashboard' }) => {
  const [activeItem, setActiveItem] = useState(activePageId);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Persist sidebar state in localStorage
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when screen becomes desktop size
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save state to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);
  
  return <>
    {/* Mobile overlay */}
    {isMobileMenuOpen && (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        onClick={() => setIsMobileMenuOpen(false)}
      />
    )}
    
    <aside className={`
      ${isCollapsed ? 'w-20' : 'w-80'} 
      flex flex-col relative transition-all duration-300 ease-in-out
      md:relative md:translate-x-0
      ${isMobileMenuOpen ? 'fixed left-0 top-0 z-50 translate-x-0' : 'fixed left-0 top-0 z-50 -translate-x-full md:translate-x-0'}
      h-full md:h-auto
    `}>
      {/* Translucent glassmorphic overlay for sidebar */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md border-r border-white/20" />
      
      {/* Content on top of glassmorphic background */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with collapse toggle */}
        <div className="p-6 border-b border-white/20" style={{
        height: "185px",
        borderWidth: "0px 0px 1.11111px",
        borderStyle: "none",
        borderColor: "oklab(0.714 0.117894 -0.165257 / 0.2)",
        borderRadius: "0px",
        background: "rgb(255 255 255 / 0)"
      }}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {/* Mobile menu button (only show on mobile) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              <Menu className="w-5 h-5" />
              <span className="text-sm font-medium ml-2">Menu</span>
            </button>
            
            {/* Desktop collapse button */}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)} 
              className={`hidden md:flex items-center text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 ${isCollapsed ? 'mx-auto' : ''}`}
            >
              {isCollapsed ? <Menu className="w-5 h-5" /> : <>
                  <X className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Collapse</span>
                </>}
            </button>
          </div>
          {!isCollapsed && <div className="mt-4">
              <h2 className="text-xl font-bold text-white" style={{
            display: "none"
          }}>Brand BOS</h2>
              <p className="text-sm text-white/70 mt-1" style={{
            display: "none"
          }}>Operating System</p>
            </div>}
        </div>

        {/* Navigation Items */}
        <nav className={`flex-1 ${isCollapsed ? 'px-2 py-6' : 'p-6'}`} style={{
        color: "oklch(14.48% 0 none)",
        background: "rgba(255, 255, 255, 0)",
        borderWidth: "0px",
        borderStyle: "none",
        borderColor: "#940cf50d",
        borderRadius: "0px"
      }}>
          <ul className="space-y-2" style={{
          marginTop: "0px",
          paddingLeft: "0px",
          paddingTop: "0px",
          paddingBottom: "0px",
          height: "690px"
        }}>
            {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return <li key={item.id}>
                  <motion.button onClick={() => {
                    setActiveItem(item.id);
                    onNavigate?.(item.id);
                    // Close mobile menu on navigation
                    setIsMobileMenuOpen(false);
                  }} className={isCollapsed ? 
                    `w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 mx-auto ${isActive ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' : 'text-white/70 hover:text-white hover:bg-white/10'}` :
                    `w-full h-12 flex items-center px-4 justify-start rounded-xl text-left transition-all duration-200 ${isActive ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' : 'text-white/70 hover:text-white hover:bg-white/10'} overflow-hidden`
                  } whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} title={isCollapsed ? item.label : undefined}>
                    <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
                    {!isCollapsed && <span className="font-medium sidebar-menu-item-ellipsis flex-1" style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'block',
                      minWidth: 0,
                      maxWidth: '100%'
                    }}>
                        {item.label}
                      </span>}
                  </motion.button>
                </li>;
          })}
          </ul>
        </nav>

        {/* Bottom Action Button */}
        <div className="p-6">
          <motion.button className={`${isCollapsed ? 'w-12 h-12' : 'w-20 h-16'} bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold ${isCollapsed ? 'text-sm' : 'text-lg'} shadow-2xl mx-auto transition-all duration-300`} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} style={{
          background: "linear-gradient(90deg, oklch(0.656 0.241 354.308) 0%, oklch(0.558 0.288 302.321) 100%)",
          display: "none"
        }}>
            {isCollapsed ? "R" : "Run"}
          </motion.button>
        </div>
      </div>
    </aside>
    
    {/* Mobile menu trigger button - positioned outside sidebar */}
    <button 
      onClick={() => setIsMobileMenuOpen(true)}
      className="md:hidden fixed top-4 left-4 z-30 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-2 text-white/80 hover:text-white transition-colors"
    >
      <Menu className="w-5 h-5" />
    </button>
  </>;
};
export default SidebarNavigation;