'use client';

import React from 'react';
import { motion } from 'framer-motion';
export interface BrandLogoProps {
  onClick?: () => void;
  className?: string;
}
const BrandLogo: React.FC<BrandLogoProps> = ({ onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className={`flex items-center space-x-3 text-slate-900 hover:text-indigo-600 transition-colors ${className}`}
    >
      {/* Logo Icon */}
      <div
        className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
        style={{
          background:
            'linear-gradient(90deg, oklch(0.585 0.233 277.117) 0%, oklch(0.558 0.288 302.321) 100%)',
          display: 'none',
        }}
      >
        <span className="text-white font-bold text-sm">B</span>
      </div>

      {/* Brand Text */}
      <div
        className="flex flex-col items-start"
        style={{
          display: 'none',
        }}
      >
        <h1 className="text-xl font-bold leading-none">Brand BOS</h1>
        <p className="text-xs text-slate-500 leading-none">Business Operating System</p>
      </div>
    </motion.button>
  );
};
export default BrandLogo;
