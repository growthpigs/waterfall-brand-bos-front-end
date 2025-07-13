"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Eye, Heart, Share2, MousePointer, DollarSign, Users, Calendar, Filter, Download, ChevronDown, ArrowUpRight, Target, Zap, Globe, BarChart3 } from 'lucide-react';
import SidebarNavigation from './SidebarNavigation';
import PersistentChatBar from './PersistentChatBar';
interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<{
    className?: string;
  }>;
}
interface ContentPerformanceItem {
  title: string;
  type: 'blog' | 'social' | 'email';
  views: number;
  engagement: number;
  ctr: number;
  date: string;
}
interface PlatformMetric {
  platform: string;
  reach: number;
  engagement: number;
  growth: number;
  color: string;
}
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return TrendingUp;
      case 'down':
        return TrendingDown;
      default:
        return Minus;
    }
  };
  const TrendIcon = getTrendIcon();
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/10 rounded-xl">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
      <h3 className="text-white/70 text-sm font-medium mb-2">{title}</h3>
      <p className="text-white text-2xl font-bold">{value}</p>
    </motion.div>;
};
const ContentPerformanceCard: React.FC<{
  item: ContentPerformanceItem;
}> = ({
  item
}) => {
  const getTypeColor = () => {
    switch (item.type) {
      case 'blog':
        return 'bg-blue-500/20 text-blue-300';
      case 'social':
        return 'bg-purple-500/20 text-purple-300';
      case 'email':
        return 'bg-green-500/20 text-green-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };
  return <motion.div initial={{
    opacity: 0,
    scale: 0.95
  }} animate={{
    opacity: 1,
    scale: 1
  }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-white font-medium text-sm mb-2 line-clamp-2">{item.title}</h4>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
            {item.type}
          </span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-white/50 hover:text-white cursor-pointer" />
      </div>
      
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center">
          <p className="text-white/50 text-xs">Views</p>
          <p className="text-white font-semibold text-sm">{item.views.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-white/50 text-xs">Engagement</p>
          <p className="text-white font-semibold text-sm">{item.engagement}%</p>
        </div>
        <div className="text-center">
          <p className="text-white/50 text-xs">CTR</p>
          <p className="text-white font-semibold text-sm">{item.ctr}%</p>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-white/10">
        <p className="text-white/40 text-xs">{item.date}</p>
      </div>
    </motion.div>;
};
const PlatformCard: React.FC<{
  platform: PlatformMetric;
}> = ({
  platform
}) => <motion.div initial={{
  opacity: 0,
  x: -20
}} animate={{
  opacity: 1,
  x: 0
}} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
    <div className="flex items-center justify-between mb-3">
      <h4 className="text-white font-medium">{platform.platform}</h4>
      <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
    </div>
    
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-white/60 text-sm">Reach</span>
        <span className="text-white font-medium">{platform.reach.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-white/60 text-sm">Engagement</span>
        <span className="text-white font-medium">{platform.engagement}%</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-white/60 text-sm">Growth</span>
        <div className="flex items-center space-x-1">
          <span className={`font-medium ${platform.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {platform.growth >= 0 ? '+' : ''}{platform.growth}%
          </span>
          {platform.growth >= 0 ? <TrendingUp className="w-3 h-3 text-green-400" /> : <TrendingDown className="w-3 h-3 text-red-400" />}
        </div>
      </div>
    </div>
  </motion.div>;
const PerformancePage: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [sortBy, setSortBy] = useState('performance');
  const handleSendMessage = (message: string) => {
    console.log('Performance insight request:', message);
  };
  const metrics = [{
    title: 'Website Traffic',
    value: '124.5K',
    change: 12.5,
    trend: 'up' as const,
    icon: Eye
  }, {
    title: 'Content Engagement',
    value: '8.2%',
    change: 3.1,
    trend: 'up' as const,
    icon: Heart
  }, {
    title: 'Social Reach',
    value: '89.3K',
    change: -2.4,
    trend: 'down' as const,
    icon: Users
  }, {
    title: 'Conversion Rate',
    value: '4.7%',
    change: 0.8,
    trend: 'up' as const,
    icon: Target
  }, {
    title: 'ROI',
    value: '285%',
    change: 15.2,
    trend: 'up' as const,
    icon: DollarSign
  }, {
    title: 'Click-through Rate',
    value: '3.4%',
    change: 0,
    trend: 'stable' as const,
    icon: MousePointer
  }] as any[];
  const contentPerformance: ContentPerformanceItem[] = [{
    title: 'The Future of Brand Storytelling in 2024',
    type: 'blog',
    views: 12500,
    engagement: 8.5,
    ctr: 4.2,
    date: '2 days ago'
  }, {
    title: 'Behind the Scenes: Our Creative Process',
    type: 'social',
    views: 8900,
    engagement: 12.3,
    ctr: 6.1,
    date: '1 week ago'
  }, {
    title: 'Weekly Brand Insights Newsletter',
    type: 'email',
    views: 5600,
    engagement: 15.7,
    ctr: 8.9,
    date: '3 days ago'
  }, {
    title: 'Customer Success Story: Brand Transformation',
    type: 'blog',
    views: 9800,
    engagement: 9.2,
    ctr: 5.3,
    date: '5 days ago'
  }, {
    title: 'Quick Tips: Social Media Optimization',
    type: 'social',
    views: 15200,
    engagement: 11.8,
    ctr: 7.4,
    date: '1 day ago'
  }, {
    title: 'Monthly Performance Report',
    type: 'email',
    views: 4200,
    engagement: 18.5,
    ctr: 12.1,
    date: '1 week ago'
  }];
  const platformMetrics: PlatformMetric[] = [{
    platform: 'Instagram',
    reach: 45200,
    engagement: 8.7,
    growth: 12.3,
    color: 'bg-pink-500'
  }, {
    platform: 'LinkedIn',
    reach: 28900,
    engagement: 6.2,
    growth: 8.9,
    color: 'bg-blue-600'
  }, {
    platform: 'Twitter',
    reach: 15600,
    engagement: 4.1,
    growth: -2.1,
    color: 'bg-sky-500'
  }, {
    platform: 'Blog',
    reach: 34800,
    engagement: 12.5,
    growth: 15.7,
    color: 'bg-green-500'
  }];
  const recommendations = [{
    title: 'Optimize posting times',
    description: 'Post 2 hours earlier for 23% better engagement',
    impact: 'High',
    icon: Calendar
  }, {
    title: 'Increase video content',
    description: 'Video posts perform 40% better than static images',
    impact: 'Medium',
    icon: Zap
  }, {
    title: 'Focus on LinkedIn',
    description: 'LinkedIn shows highest growth potential this quarter',
    impact: 'High',
    icon: TrendingUp
  }, {
    title: 'Email subject optimization',
    description: 'A/B test subject lines to improve open rates',
    impact: 'Medium',
    icon: Target
  }] as any[];
  return <div className="flex h-screen w-full overflow-hidden">
      {/* Full-screen gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-800 -z-10" />
      
      {/* Left Sidebar */}
      <SidebarNavigation />
      
      {/* Fixed 30px gap */}
      <div className="w-[30px] flex-shrink-0" />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative min-h-screen">
        {/* Main Content Container */}
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="max-w-7xl pb-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    Performance Analytics
                  </h1>
                  <p className="text-white/70 text-lg">
                    Track your brand's growth and optimize your strategy
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <select value={selectedDateRange} onChange={e => setSelectedDateRange(e.target.value)} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30">
                    <option value="7d" className="bg-gray-800">Last 7 days</option>
                    <option value="30d" className="bg-gray-800">Last 30 days</option>
                    <option value="90d" className="bg-gray-800">Last 90 days</option>
                  </select>
                  
                  <button className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white text-sm hover:bg-white/20 transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {metrics.map((metric, index) => <motion.div key={metric.title} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }}>
                  <MetricCard {...metric} />
                </motion.div>)}
            </div>

            {/* Analytics Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Traffic Sources Chart */}
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h3 className="text-white font-semibold text-lg mb-4">Traffic Sources</h3>
                <div className="space-y-4">
                  {[{
                  source: 'Organic Search',
                  percentage: 45,
                  color: 'bg-green-500'
                }, {
                  source: 'Social Media',
                  percentage: 28,
                  color: 'bg-purple-500'
                }, {
                  source: 'Direct',
                  percentage: 15,
                  color: 'bg-blue-500'
                }, {
                  source: 'Email',
                  percentage: 12,
                  color: 'bg-orange-500'
                }].map(item => <div key={item.source} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-white/80 text-sm">{item.source}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-white/10 rounded-full h-2">
                          <div className={`h-2 rounded-full ${item.color}`} style={{
                        width: `${item.percentage}%`
                      }}></div>
                        </div>
                        <span className="text-white font-medium text-sm w-8">{item.percentage}%</span>
                      </div>
                    </div>)}
                </div>
              </motion.div>

              {/* Platform Performance */}
              <motion.div initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h3 className="text-white font-semibold text-lg mb-4">Platform Breakdown</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {platformMetrics.map((platform, index) => <motion.div key={platform.platform} initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: index * 0.1
                }}>
                      <PlatformCard platform={platform} />
                    </motion.div>)}
                </div>
              </motion.div>
            </div>

            {/* Content Performance Grid */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-lg">Content Performance</h3>
                <div className="flex items-center space-x-3">
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30">
                    <option value="performance" className="bg-gray-800">Sort by Performance</option>
                    <option value="date" className="bg-gray-800">Sort by Date</option>
                    <option value="views" className="bg-gray-800">Sort by Views</option>
                  </select>
                  <button className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-white text-sm hover:bg-white/20 transition-colors flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contentPerformance.map((item, index) => <motion.div key={`${item.title}-${index}`} initial={{
                opacity: 0,
                scale: 0.95
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: index * 0.05
              }}>
                    <ContentPerformanceCard item={item} />
                  </motion.div>)}
              </div>
            </motion.div>

            {/* Optimization Recommendations */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
              <h3 className="text-white font-semibold text-lg mb-6">AI Optimization Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec, index) => <motion.div key={rec.title} initial={{
                opacity: 0,
                x: -10
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.1
              }} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <rec.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium text-sm">{rec.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${rec.impact === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                            {rec.impact}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm">{rec.description}</p>
                      </div>
                    </div>
                  </motion.div>)}
              </div>
            </motion.div>

            {/* Chat Bar */}
            <div className="mt-8 pb-8">
              <PersistentChatBar onSendMessage={handleSendMessage} placeholder="Ask about performance insights, optimization tips, or data analysis..." />
            </div>
          </motion.div>
        </div>
      </main>
    </div>;
};
export default PerformancePage;