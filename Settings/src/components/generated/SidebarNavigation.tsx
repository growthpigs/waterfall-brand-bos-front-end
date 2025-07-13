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
  id: 'intelligence',
  label: 'Brand Intelligence',
  icon: Target
}, {
  id: 'cia',
  label: 'CIA Analysis',
  icon: Shield
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
  icon: Settings,
  active: true
}];
const SidebarNavigation: React.FC = () => {
  const [activeItem, setActiveItem] = useState('settings');
  const [isCollapsed, setIsCollapsed] = useState(false);
  return <aside className={`${isCollapsed ? 'w-20' : 'w-80'} flex flex-col relative transition-all duration-300 ease-in-out`}>
      {/* Gray/slate glassmorphic overlay for sidebar */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-600/30 via-slate-700/40 to-gray-800/50 backdrop-blur-md border-r border-gray-400/20" />
      
      {/* Content on top of glassmorphic background */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with collapse toggle */}
        <div className="p-6 border-b border-gray-400/20" style={{
        height: "185px",
        borderWidth: "0px 0px 1.11111px",
        borderStyle: "none",
        borderColor: "oklab(0.714 0.117894 -0.165257 / 0.2)",
        borderRadius: "0px",
        background: "rgb(255 255 255 / 0)"
      }}>
          <div className="flex items-center justify-between">
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="flex items-center text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
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
        <nav className="flex-1 p-6" style={{
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
                  <motion.button onClick={() => setActiveItem(item.id)} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-3 rounded-xl text-left transition-all duration-200 ${isActive ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' : 'text-white/70 hover:text-white hover:bg-white/10'}`} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} style={{
                paddingBottom: "22px"
              }} title={isCollapsed ? item.label : undefined}>
                    <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
                    {!isCollapsed && <span className="font-medium sidebar-menu-item-ellipsis" style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'block',
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
          <motion.button className={`${isCollapsed ? 'w-12 h-12' : 'w-16 h-16'} bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold ${isCollapsed ? 'text-sm' : 'text-lg'} shadow-2xl mx-auto transition-all duration-300`} whileHover={{
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
    </aside>;
};
export default SidebarNavigation;