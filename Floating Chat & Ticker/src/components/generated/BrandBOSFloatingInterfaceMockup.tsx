import React from 'react';
import { motion } from 'framer-motion';
import AIFloatingChatBubble from './AIFloatingChatBubble';
import FloatingTickerTape from './FloatingTickerTape';
const BrandBOSFloatingInterfaceMockup: React.FC = () => {
  return <div className="relative w-full h-screen overflow-hidden">
      {/* Main viewport container with 16:9 aspect ratio */}
      <div className="w-full h-full bg-gradient-to-br from-teal-400 via-teal-500 to-green-500">
        {/* Background gradient representing the web application interface */}
        <div className="w-full h-full relative">
          {/* Sidebar simulation - left side */}
          <div className="absolute left-0 top-0 w-64 h-full bg-black/10 backdrop-blur-sm border-r border-white/10">
            <div className="p-6">
              <div className="text-white/40 text-sm font-medium">Navigation</div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="ml-64 h-full relative" style={{
          width: 'calc(100% - 16rem)'
        }}>
            <div className="w-full h-full flex items-center justify-center px-6">
              <div className="text-white/20 text-6xl font-light select-none">
                Brand BOS Interface
              </div>
            </div>
            
            {/* Floating AI Chat Bubble - positioned closer to ticker (30px from bottom), 24px from edges of main content area */}
            <div className="absolute bottom-8 left-6 right-6 z-20">
              <AIFloatingChatBubble />
            </div>
          </div>
          
          {/* Floating Ticker Tape - positioned closer to chat, constrained to main content area */}
          <div className="absolute bottom-1 left-64 right-0 z-10 px-6">
            <FloatingTickerTape />
          </div>
        </div>
      </div>
    </div>;
};
export default BrandBOSFloatingInterfaceMockup;