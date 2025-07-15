/**
 * Professional Services Button Component
 * Brand BOS - Authority Platform Professional Button System
 */

import React from 'react';
import { motion } from 'framer-motion';

interface ProfessionalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  animation?: 'scale' | 'lift' | 'none';
}

const ProfessionalButton: React.FC<ProfessionalButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  animation = 'scale'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-cyan-500 hover:bg-cyan-600 text-white border-cyan-400/50';
      case 'secondary':
        return 'bg-white/10 hover:bg-white/20 text-white border-white/20';
      case 'tertiary':
        return 'bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border-white/10';
      case 'ghost':
        return 'bg-transparent hover:bg-white/10 text-white/70 hover:text-white border-transparent';
      default:
        return 'bg-cyan-500 hover:bg-cyan-600 text-white border-cyan-400/50';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1.5 text-sm';
      case 'medium':
        return 'px-4 py-2 text-sm';
      case 'large':
        return 'px-6 py-3 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  const getDisabledStyles = () => {
    if (disabled) {
      return 'opacity-50 cursor-not-allowed';
    }
    return '';
  };

  const getAnimationProps = () => {
    if (disabled || animation === 'none') return {};
    
    switch (animation) {
      case 'scale':
        return {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 }
        };
      case 'lift':
        return {
          whileHover: { y: -1, scale: 1.01 },
          whileTap: { scale: 0.99 }
        };
      default:
        return {};
    }
  };

  const baseStyles = `
    backdrop-blur-sm border rounded-lg font-medium transition-all duration-200 ease-in-out
    flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white/40
    ${getVariantStyles()}
    ${getSizeStyles()}
    ${getDisabledStyles()}
    ${className}
  `;

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </>
  );

  if (animation === 'none' || disabled) {
    return (
      <button className={baseStyles} onClick={handleClick} disabled={disabled}>
        {content}
      </button>
    );
  }

  return (
    <motion.button
      className={baseStyles}
      onClick={handleClick}
      disabled={disabled}
      {...getAnimationProps()}
    >
      {content}
    </motion.button>
  );
};

export default ProfessionalButton;