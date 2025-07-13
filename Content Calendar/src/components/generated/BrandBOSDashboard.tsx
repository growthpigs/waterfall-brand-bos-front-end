"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SidebarNavigation from './SidebarNavigation';
import DashboardCardGrid from './DashboardCardGrid';
import NotificationBubbles from './NotificationBubbles';
import PersistentChatBar from './PersistentChatBar';
import BrandLogo from './BrandLogo';
const BrandBOSDashboard: React.FC = () => {
  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // Handle message sending logic here
  };
  const handleLogoClick = () => {
    console.log('Logo clicked - navigate to home');
    // Handle navigation to home/dashboard
  };
  return <div className="flex h-screen w-full overflow-hidden">
      
      {/* Left Sidebar - transparent/glassmorphic on top of gradient */}
      <SidebarNavigation />
      
      {/* Fixed 30px gap */}
      <div className="w-[30px] flex-shrink-0" />
      
      {/* Main Content Area - no background, sits on gradient */}
      <main className="flex-1 flex flex-col relative min-h-screen">
        {/* Header with Logo and Notifications */}
        <header className="relative h-16 flex items-center justify-between px-8 bg-white/10 backdrop-blur-sm border-b border-white/20" style={{
        display: "none"
      }}>
          <BrandLogo onClick={handleLogoClick} />
          <NotificationBubbles />
        </header>
        
        {/* Main Content Container */}
        <div className="flex-1 px-8 pt-8 overflow-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg" style={{
              paddingLeft: "22px",
              fontSize: "33px"
            }}>
                Your tasks are ready to run. Look what we found:
              </h1>
            </div>
            
            <DashboardCardGrid />
            
            {/* Chat Bar positioned below widgets with matching width */}
            <div className="mt-8 pb-8" style={{
            marginTop: "88px",
            paddingBottom: "0px"
          }}>
              <PersistentChatBar onSendMessage={handleSendMessage} />
            </div>
          </motion.div>
        </div>
      </main>
    </div>;
};
export default BrandBOSDashboard;