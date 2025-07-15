import React from 'react';

/**
 * Professional Services Responsive Gap Component
 * Provides optimized spacing between sidebar and content
 * - Mobile (< 640px): 16px for more content space
 * - Tablet/Desktop (640px+): 24px professional standard
 */
const ProfessionalGap: React.FC = () => {
  return (
    <div className="professional-gap flex-shrink-0 w-[16px] md:w-[24px]" />
  );
};

export default ProfessionalGap;