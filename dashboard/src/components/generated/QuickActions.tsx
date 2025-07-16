import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Search, TrendingUp, Zap, Activity, Target } from 'lucide-react';

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  hoverBorderColor: string;
  hoverShadowColor: string;
}

const QuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      icon: AlertTriangle,
      label: 'Brand Alert',
      color: 'text-pink-600',
      bgColor: 'bg-pink-600/10',
      borderColor: 'border-pink-600/30',
      hoverBorderColor: 'hover:border-pink-500/50',
      hoverShadowColor: 'hover:shadow-pink-500/20'
    },
    {
      icon: Search,
      label: 'Research Mode',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-600/10',
      borderColor: 'border-indigo-600/30',
      hoverBorderColor: 'hover:border-indigo-500/50',
      hoverShadowColor: 'hover:shadow-indigo-500/20'
    },
    {
      icon: TrendingUp,
      label: 'Trend Analysis',
      color: 'text-green-600',
      bgColor: 'bg-green-600/10',
      borderColor: 'border-green-600/30',
      hoverBorderColor: 'hover:border-green-500/50',
      hoverShadowColor: 'hover:shadow-green-500/20'
    },
    {
      icon: Zap,
      label: 'Quick Campaign',
      color: 'text-amber-600',
      bgColor: 'bg-amber-600/10',
      borderColor: 'border-amber-600/30',
      hoverBorderColor: 'hover:border-amber-500/50',
      hoverShadowColor: 'hover:shadow-amber-500/20'
    },
    {
      icon: Activity,
      label: 'Live Monitor',
      color: 'text-purple-600',
      bgColor: 'bg-purple-600/10',
      borderColor: 'border-purple-600/30',
      hoverBorderColor: 'hover:border-purple-500/50',
      hoverShadowColor: 'hover:shadow-purple-500/20'
    },
    {
      icon: Target,
      label: 'Set Goals',
      color: 'text-orange-600',
      bgColor: 'bg-orange-600/10',
      borderColor: 'border-orange-600/30',
      hoverBorderColor: 'hover:border-orange-500/50',
      hoverShadowColor: 'hover:shadow-orange-500/20'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{
        y: -2,
        transition: { duration: 0.2 }
      }}
      className="bg-black/15 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-purple-500/30 shadow-2xl hover:bg-black/20 hover:border-orange-500/40 hover:shadow-purple-500/20 transition-all duration-300 group"
      style={{ boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.12), 0 4px 6px -4px rgb(0 0 0 / 0.12)" }}
    >
      <div className="flex items-start justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 lg:p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-400/20 group-hover:border-orange-400/30 group-hover:shadow-lg group-hover:shadow-purple-400/10 transition-all duration-300">
            <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-white/95" />
          </div>
          <h3 className="text-lg lg:text-xl font-semibold text-white/95">Quick Actions</h3>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 lg:gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${action.bgColor} backdrop-blur-sm rounded-xl p-4 lg:p-5 border ${action.borderColor} ${action.hoverBorderColor} hover:bg-black/25 ${action.hoverShadowColor} transition-all duration-300 flex flex-col items-center space-y-2`}
          >
            <action.icon className={`w-6 h-6 lg:w-8 lg:h-8 ${action.color}`} />
            <span className="text-xs lg:text-sm font-medium text-white/90">{action.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-4 lg:mt-6 pt-4 border-t border-purple-400/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/75">Quick access to key features</span>
          <span className="text-white/90">Ready</span>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickActions;