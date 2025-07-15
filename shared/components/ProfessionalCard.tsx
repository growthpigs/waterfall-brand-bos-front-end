/**
 * Professional Services Card Component
 * Brand BOS - Authority Platform Professional Card System
 */

import React from 'react';
import { motion } from 'framer-motion';

interface ProfessionalCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  active?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  animation?: 'lift' | 'scale' | 'none';
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  children,
  className = '',
  hover = true,
  active = false,
  onClick,
  variant = 'primary',
  animation = 'lift'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-white/10 backdrop-blur-md border border-white/20';
      case 'secondary':
        return 'bg-white/5 backdrop-blur-sm border border-white/10';
      case 'tertiary':
        return 'bg-white/15 backdrop-blur-lg border border-white/30';
      default:
        return 'bg-white/10 backdrop-blur-md border border-white/20';
    }
  };

  const getActiveStyles = () => {
    if (active) {
      return 'bg-white/20 border-white/40 shadow-2xl';
    }
    return '';
  };

  const getHoverStyles = () => {
    if (hover) {
      return 'hover:bg-white/15 hover:border-white/30 hover:shadow-xl';
    }
    return '';
  };

  const getAnimationProps = () => {
    switch (animation) {
      case 'lift':
        return {
          whileHover: { y: -2, scale: 1.01 },
          whileTap: { scale: 0.99 }
        };
      case 'scale':
        return {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 }
        };
      default:
        return {};
    }
  };

  const baseStyles = `
    rounded-2xl p-6 shadow-xl transition-all duration-300 ease-in-out
    ${getVariantStyles()}
    ${getActiveStyles()}
    ${getHoverStyles()}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  if (animation === 'none') {
    return (
      <div className={baseStyles} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={baseStyles}
      onClick={onClick}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  );
};

export default ProfessionalCard;