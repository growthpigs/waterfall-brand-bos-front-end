"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SidebarNavigation from './SidebarNavigation';
import DashboardCardGrid from './DashboardCardGrid';
import PersistentChatBar from './PersistentChatBar';
const EnhancedBrandBOSDashboard: React.FC = () => {
  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // Handle message sending logic here
  };
  return <div className="flex h-screen w-full overflow-hidden">
      {/* Full-screen seamless purple gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 -z-10" />
      
      {/* Left Sidebar - glassmorphic on gradient */}
      <SidebarNavigation />
      
      {/* Fixed 30px gap */}
      <div className="w-[30px] flex-shrink-0" />
      
      {/* Main Content Area - transparent, sits on gradient */}
      <main className="flex-1 flex flex-col relative min-h-screen">
        {/* Main Content Container */}
        <div className="flex-1 pl-0 pr-8 pt-12 pb-8 overflow-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="w-full h-full flex flex-col">
            {/* Header Section */}
            <div className="mb-8">
              <motion.h1 initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.7,
              delay: 0.2
            }} className="text-4xl font-bold text-white mb-3 drop-shadow-lg leading-tight">
                Welcome to Brand BOS
              </motion.h1>
              <motion.p initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.7,
              delay: 0.3
            }} className="text-xl text-white/90 drop-shadow-sm font-light">
                Your intelligent and Operating System is ready. Here's what we found:
              </motion.p>
            </div>
            
            {/* Dashboard Cards Grid */}
            <div className="flex-1 mb-8">
              <DashboardCardGrid />
            </div>
            
            {/* Persistent Chat Bar - positioned within content area */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.8
          }} className="mt-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-white/90 mb-1">
                    AI Assistant
                  </h3>
                  <p className="text-sm text-white/70">
                    Ask me anything about your brand performance, content strategy, or campaign optimization
                  </p>
                </div>
                <PersistentChatBar onSendMessage={handleSendMessage} placeholder="Ask Brand BOS anything about your performance..." />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>;
};
export default EnhancedBrandBOSDashboard;