import React from 'react';

/**
 * Professional Services Responsive Gap Component
 * Provides optimized spacing between sidebar and content
 * - Mobile (< 640px): 16px for more content space
 * - Tablet/Desktop (640px+): 24px professional standard
 */
const ProfessionalGap: React.FC = () => {
  return (
    <>
      {/* CSS-based responsive gap */}
      <div className="professional-gap" />
      
      {/* Fallback for browsers without CSS custom property support */}
      <style jsx>{`
        .professional-gap {
          width: 16px;
          flex-shrink: 0;
        }
        
        @media (min-width: 640px) {
          .professional-gap {
            width: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default ProfessionalGap;