import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Target, 
  Calendar, 
  Zap, 
  BarChart3, 
  Settings, 
  Search,
  Bell,
  User,
  Brain,
  Menu,
  X
} from 'lucide-react';

const TopNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/', active: location.pathname === '/' },
    { icon: Brain, label: 'CIA', path: '/cia', active: location.pathname === '/cia' },
    { icon: Target, label: 'Campaign', path: '/campaign', active: location.pathname === '/campaign' },
    { icon: Calendar, label: 'Content Calendar', path: '/content-calendar', active: location.pathname === '/content-calendar' },
    { icon: Zap, label: 'Content Engine', path: '/content-engine', active: location.pathname === '/content-engine' },
    { icon: BarChart3, label: 'Performance', path: '/performance', active: location.pathname === '/performance' },
    { icon: Settings, label: 'Settings', path: '/settings', active: location.pathname === '/settings' },
  ];
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-purple-500/30"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-white/95 font-semibold text-lg">Brand BOS</span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-0.5">
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(item.path)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  item.active
                    ? 'bg-purple-500/20 text-white border border-purple-400/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 relative"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-black/20" />
            </motion.button>

            {/* User Profile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <User className="w-5 h-5" />
            </motion.button>
            
            {/* Mobile Menu Button - Far Right */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu Full Screen Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="md:hidden fixed inset-0 bg-white z-50"
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-purple-700 hover:bg-purple-50 transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              
              {/* Menu Items */}
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleNavigation(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-3 ${
                      item.active
                        ? 'bg-purple-100 text-purple-800 border-l-4 border-purple-600'
                        : 'text-purple-700 hover:bg-purple-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-lg">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default TopNavigation; 