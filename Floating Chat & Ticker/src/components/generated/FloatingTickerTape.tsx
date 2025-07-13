import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, AlertTriangle, Flame } from 'lucide-react';
const FloatingTickerTape: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const tickerItems = [{
    text: "CONTENT CLUSTER #3 EXCEEDING PERFORMANCE TARGETS",
    icon: Flame
  }, {
    text: "GOOGLE AD GRANT EFFICIENCY UP 12%",
    icon: TrendingUp
  }, {
    text: "NEW CIA INTELLIGENCE AVAILABLE FOR CUSTOMER SUCCESS CAMPAIGN",
    icon: BarChart3
  }, {
    text: "AUTHORITY BUILDING SCORE INCREASED 15% THIS WEEK",
    icon: TrendingUp
  }, {
    text: "CROSS-PLATFORM ATTRIBUTION SHOWS 94% IMPROVEMENT",
    icon: BarChart3
  }, {
    text: "CONVERSION RATE OPTIMIZATION NEEDS ATTENTION",
    icon: AlertTriangle
  }, {
    text: "BRAND SENTIMENT TRACKING UP 8% THIS QUARTER",
    icon: TrendingUp
  }, {
    text: "COMPETITOR ANALYSIS REVEALS NEW OPPORTUNITIES",
    icon: BarChart3
  }] as any[];
  const handleTickerClick = (item: string) => {
    console.log(`Navigating to: ${item}`);
  };
  return <div className="w-full overflow-hidden relative h-5" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {/* Scrolling ticker text */}
      <motion.div animate={{
      x: isPaused ? undefined : [0, -3000]
    }} transition={{
      duration: 100,
      repeat: Infinity,
      ease: "linear"
    }} className="absolute whitespace-nowrap flex items-center h-full cursor-pointer" style={{
      width: 'max-content'
    }}>
        {/* Repeat ticker items multiple times for continuous scroll */}
        {Array.from({
        length: 4
      }).map((_, repeatIndex) => <div key={repeatIndex} className="flex items-center">
            {tickerItems.map((item, index) => {
          const IconComponent = item.icon;
          return <div key={`${repeatIndex}-${index}`} className="flex items-center mr-12 hover:opacity-80 transition-opacity duration-200" onClick={() => handleTickerClick(item.text)}>
                  <IconComponent className="w-3 h-3 text-white mr-2 flex-shrink-0" />
                  <span className="text-white text-xs tracking-wider" style={{
              fontFamily: "'JetBrains Mono', 'Monaco', 'Courier New', monospace",
              letterSpacing: '0.08em',
              fontSize: '0.7rem'
            }}>
                    {item.text}
                  </span>
                </div>;
        })}
          </div>)}
      </motion.div>
    </div>;
};
export default FloatingTickerTape;