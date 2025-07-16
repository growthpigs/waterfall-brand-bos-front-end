import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Target, Users, BarChart3, CheckCircle } from 'lucide-react';

interface TickerItem {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  type: 'success' | 'info' | 'warning' | 'update';
}

const TickerTape: React.FC = () => {
  const tickerItems: TickerItem[] = [
    {
      icon: CheckCircle,
      text: "Campaign 'Tech Innovation Series' completed - 94% success rate",
      type: 'success'
    },
    {
      icon: TrendingUp,
      text: "SEO rankings improved by 23% across all client accounts",
      type: 'info'
    },
    {
      icon: Zap,
      text: "Content Engine generated 47 new pieces in the last hour",
      type: 'update'
    },
    {
      icon: Users,
      text: "3 new client onboardings scheduled for this week",
      type: 'info'
    },
    {
      icon: Target,
      text: "Q4 authority score targets exceeded by 15%",
      type: 'success'
    },
    {
      icon: BarChart3,
      text: "Real-time analytics showing 340% ROI improvement",
      type: 'update'
    },
    {
      icon: Zap,
      text: "AI optimization reduced content creation time by 60%",
      type: 'info'
    },
    {
      icon: CheckCircle,
      text: "Weekly publishing schedule: 98% on-time delivery",
      type: 'success'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-orange-400';
      case 'update':
        return 'text-white/70';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-lg border-t border-white/20 overflow-hidden">
      <div className="h-8 flex items-center">
        <motion.div
          animate={{
            x: [window.innerWidth, -window.innerWidth * 2]
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex items-center space-x-8 whitespace-nowrap"
        >
          {/* Repeat items to ensure continuous scroll */}
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div
              key={`ticker-${index}`}
              className="flex items-center space-x-3 px-4"
            >
              <div className={`p-1.5 rounded-full bg-black/20 ${getTypeColor(item.type)}`}>
                <item.icon className="w-3 h-3" />
              </div>
              <span className="text-white/80 text-sm font-medium font-mono">
                {item.text}
              </span>
              {index < (tickerItems.length * 2) - 1 && (
                <div className="w-1 h-1 bg-white/30 rounded-full ml-8" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TickerTape; 