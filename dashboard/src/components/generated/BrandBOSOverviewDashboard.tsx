"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Target, Shield, FileText, Calendar, Rocket, BarChart3, Settings, TrendingUp, Activity, Clock } from 'lucide-react';
interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  active?: boolean;
}
interface MetricCardProps {
  title: string;
  value: string;
  status: string;
  delay?: number;
}
interface WideCardProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  delay?: number;
}
const navigationItems: NavItem[] = [{
  id: 'dashboard',
  label: 'Dashboard',
  icon: Home,
  active: true
}, {
  id: 'intelligence',
  label: 'Brand Intelligence',
  icon: Target
}, {
  id: 'cia',
  label: 'CIA Analysis',
  icon: Shield
}, {
  id: 'content',
  label: 'Content Engine',
  icon: FileText
}, {
  id: 'calendar',
  label: 'Content Calendar',
  icon: Calendar
}, {
  id: 'campaigns',
  label: 'Campaign Center',
  icon: Rocket
}, {
  id: 'performance',
  label: 'Performance',
  icon: BarChart3
}, {
  id: 'settings',
  label: 'Settings',
  icon: Settings
}];
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  status,
  delay = 0
}) => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6,
    delay
  }} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
          {status}
        </span>
      </div>
    </motion.div>;
};
const WideCard: React.FC<WideCardProps> = ({
  title,
  subtitle,
  content,
  delay = 0
}) => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6,
    delay
  }} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">{subtitle}</span>
      </div>
      {content}
    </motion.div>;
};
const BrandBOSOverviewDashboard: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('dashboard');
  const [message, setMessage] = React.useState('');
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };
  const performanceChart = <div className="h-32 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <TrendingUp className="w-8 h-8 text-purple-500" />
        <div>
          <div className="text-2xl font-bold text-gray-900">+24%</div>
          <div className="text-sm text-gray-600">vs last month</div>
        </div>
      </div>
    </div>;
  const recentActivity = <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm text-gray-700">Campaign "Summer Launch" went live</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span className="text-sm text-gray-700">New content published to Instagram</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        <span className="text-sm text-gray-700">Performance report generated</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        <span className="text-sm text-gray-700">Brand intelligence updated</span>
      </div>
    </div>;
  return <div className="flex h-screen w-full overflow-hidden">
      {/* Purple gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800 -z-10" />
      
      {/* Left Sidebar - Glassmorphic */}
      <aside className="w-80 flex flex-col relative">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md border-r border-white/20" />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6
          }} className="text-white">
              <h2 className="text-xl font-bold">Brand BOS</h2>
              <p className="text-sm text-white/70 mt-1">Overview Dashboard</p>
            </motion.div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return <motion.li key={item.id} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.6,
                delay: index * 0.1
              }}>
                    <button onClick={() => setActiveItem(item.id)} className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${isActive ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </motion.li>;
            })}
            </ul>
          </nav>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative min-h-screen">
        <div className="flex-1 pl-0 pr-8 pt-8 pb-8 overflow-auto">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            {/* Header */}
            <motion.div initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                Dashboard Overview
              </h1>
              <p className="text-xl text-white/90 drop-shadow-sm font-light">
                Your brand performance at a glance
              </p>
            </motion.div>
            
            {/* Top Row - 3 Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <MetricCard title="Active Campaigns" value="12" status="Running" delay={0.2} />
              <MetricCard title="Content Pieces" value="847" status="Published" delay={0.3} />
              <MetricCard title="Monthly ROI" value="340%" status="Growth" delay={0.4} />
            </div>
            
            {/* Bottom Row - 2 Wide Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 flex-1">
              <WideCard title="Performance Overview" subtitle="Last 30 days" content={performanceChart} delay={0.5} />
              <WideCard title="Recent Activity" subtitle="Updated 2 min ago" content={recentActivity} delay={0.6} />
            </div>
            
            {/* Chat Bar */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.7
          }} className="mt-auto">
              <form onSubmit={handleSendMessage} className="relative">
                <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl overflow-hidden shadow-xl">
                  <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Ask Brand BOS anything..." className="flex-1 px-6 py-4 text-white placeholder-white/60 bg-transparent border-none outline-none" />
                  <button type="submit" disabled={!message.trim()} className={`m-3 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${message.trim() ? 'bg-white/30 backdrop-blur-sm text-white hover:bg-white/40 shadow-lg border border-white/40' : 'bg-white/10 text-white/40 cursor-not-allowed'}`}>
                    <Activity className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>;
};
export default BrandBOSOverviewDashboard;