"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Globe, Mail, TrendingUp, Users, DollarSign, Eye, MousePointer, Play, Pause, Edit3, MoreHorizontal, Plus, Settings, AlertTriangle, CheckCircle, Clock, Target, BarChart3, Zap, ChevronDown } from 'lucide-react';
import SidebarNavigation from './SidebarNavigation';
import PersistentChatBar from './PersistentChatBar';
interface CampaignMetrics {
  spend: number;
  conversions: number;
  roi: number;
  reach?: number;
  visitors?: number;
  sends?: number;
  engagement?: number;
}
interface Campaign {
  id: string;
  name: string;
  type: 'facebook' | 'landing' | 'email' | 'social';
  status: 'active' | 'testing' | 'paused' | 'underperforming';
  thumbnail: string;
  metrics: CampaignMetrics;
}
const CampaignCenterPage: React.FC = () => {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const handleSendMessage = (message: string) => {
    console.log('Campaign Assistant message:', message);
  };
  const dashboardMetrics = {
    facebookAds: {
      activeCampaigns: 12,
      totalSpend: 45680,
      reach: 2400000,
      conversionRate: 3.2
    },
    landingPages: {
      totalVisitors: 89500,
      conversionRate: 4.8,
      topPages: ['Product Launch', 'Black Friday', 'Newsletter Signup']
    },
    promotions: {
      emailSends: 156000,
      socialAmplification: 89,
      engagementRate: 6.7
    }
  };
  const campaigns: Campaign[] = [{
    id: '1',
    name: 'Q4 Product Launch',
    type: 'facebook',
    status: 'active',
    thumbnail: '/api/placeholder/120/80',
    metrics: {
      spend: 2400,
      conversions: 89,
      roi: 340
    }
  }, {
    id: '2',
    name: 'Holiday Landing Page',
    type: 'landing',
    status: 'testing',
    thumbnail: '/api/placeholder/120/80',
    metrics: {
      spend: 800,
      conversions: 24,
      roi: 180,
      visitors: 4500
    }
  }, {
    id: '3',
    name: 'Email Nurture Series',
    type: 'email',
    status: 'active',
    thumbnail: '/api/placeholder/120/80',
    metrics: {
      spend: 150,
      conversions: 67,
      roi: 450,
      sends: 12000
    }
  }, {
    id: '4',
    name: 'Social Amplification',
    type: 'social',
    status: 'underperforming',
    thumbnail: '/api/placeholder/120/80',
    metrics: {
      spend: 600,
      conversions: 8,
      roi: 80,
      engagement: 2.1
    }
  }, {
    id: '5',
    name: 'Retargeting Campaign',
    type: 'facebook',
    status: 'active',
    thumbnail: '/api/placeholder/120/80',
    metrics: {
      spend: 1200,
      conversions: 45,
      roi: 280
    }
  }, {
    id: '6',
    name: 'Lead Magnet Page',
    type: 'landing',
    status: 'paused',
    thumbnail: '/api/placeholder/120/80',
    metrics: {
      spend: 300,
      conversions: 12,
      roi: 120,
      visitors: 1800
    }
  }];
  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'testing':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'paused':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'underperforming':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };
  const getROIColor = (roi: number) => {
    if (roi >= 300) return 'text-green-400';
    if (roi >= 150) return 'text-yellow-400';
    return 'text-red-400';
  };
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
        <div className="flex-1 px-8 pt-8 overflow-auto">
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
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg pl-6">
                Campaign Center
              </h1>
              <p className="text-white/70 pl-6">
                Manage and optimize your marketing campaigns across all channels
              </p>
            </div>

            {/* Dashboard Metrics Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Facebook Ads Card */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                      <Facebook className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Facebook Ads</h3>
                      <p className="text-white/60 text-sm">Active Campaigns</p>
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Active:</span>
                    <span className="text-white font-medium">{dashboardMetrics.facebookAds.activeCampaigns}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Spend:</span>
                    <span className="text-white font-medium">${dashboardMetrics.facebookAds.totalSpend.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Reach:</span>
                    <span className="text-white font-medium">{(dashboardMetrics.facebookAds.reach / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Conv. Rate:</span>
                    <span className="text-green-400 font-medium">{dashboardMetrics.facebookAds.conversionRate}%</span>
                  </div>
                </div>
              </motion.div>

              {/* Landing Pages Card */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                      <Globe className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Landing Pages</h3>
                      <p className="text-white/60 text-sm">Performance</p>
                    </div>
                  </div>
                  <Eye className="w-5 h-5 text-purple-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Visitors:</span>
                    <span className="text-white font-medium">{dashboardMetrics.landingPages.totalVisitors.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Conv. Rate:</span>
                    <span className="text-green-400 font-medium">{dashboardMetrics.landingPages.conversionRate}%</span>
                  </div>
                  <div className="text-white/70 text-sm">Top Pages:</div>
                  <div className="space-y-1">
                    {dashboardMetrics.landingPages.topPages.slice(0, 2).map((page, index) => <div key={index} className="text-white/80 text-sm">• {page}</div>)}
                  </div>
                </div>
              </motion.div>

              {/* Promotional Campaigns Card */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-pink-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Promotions</h3>
                      <p className="text-white/60 text-sm">Multi-Channel</p>
                    </div>
                  </div>
                  <Zap className="w-5 h-5 text-pink-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Email Sends:</span>
                    <span className="text-white font-medium">{dashboardMetrics.promotions.emailSends.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Social Amp:</span>
                    <span className="text-white font-medium">{dashboardMetrics.promotions.socialAmplification}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Engagement:</span>
                    <span className="text-green-400 font-medium">{dashboardMetrics.promotions.engagementRate}%</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions Bar */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8 shadow-xl">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105">
                    <Facebook className="w-4 h-4 mr-2" />
                    Create Facebook Ad
                  </button>
                  <button className="flex items-center px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105">
                    <Globe className="w-4 h-4 mr-2" />
                    Build Landing Page
                  </button>
                  <button className="flex items-center px-6 py-3 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105">
                    <Mail className="w-4 h-4 mr-2" />
                    Launch Promotion
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all duration-200">
                    Bulk Actions
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                  <button className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-200">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Campaign Grid */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Active Campaigns</h2>
                <div className="flex items-center gap-3">
                  <span className="text-white/60 text-sm">{campaigns.length} campaigns</span>
                  <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm transition-all duration-200">
                    <Plus className="w-4 h-4 mr-2" />
                    New Campaign
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {campaigns.map((campaign, index) => <motion.div key={campaign.id} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.1 * index
              }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    {/* Campaign Thumbnail */}
                    <div className="h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                        {campaign.type === 'facebook' && <Facebook className="w-8 h-8 text-blue-400" />}
                        {campaign.type === 'landing' && <Globe className="w-8 h-8 text-purple-400" />}
                        {campaign.type === 'email' && <Mail className="w-8 h-8 text-pink-400" />}
                        {campaign.type === 'social' && <Target className="w-8 h-8 text-green-400" />}
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Campaign Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">{campaign.name}</h3>
                          <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Spend:</span>
                          <span className="text-white">${campaign.metrics.spend}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Conversions:</span>
                          <span className="text-white">{campaign.metrics.conversions}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">ROI:</span>
                          <span className={`font-medium ${getROIColor(campaign.metrics.roi)}`}>
                            {campaign.metrics.roi}%
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button className="flex-1 flex items-center justify-center px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-xs transition-all duration-200">
                          <Edit3 className="w-3 h-3 mr-1" />
                          Edit
                        </button>
                        <button className="flex items-center justify-center p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200">
                          {campaign.status === 'paused' ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                        </button>
                        <button className="flex items-center justify-center p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200">
                          <MoreHorizontal className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>)}
              </div>
            </motion.div>

            {/* Performance Overview & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Performance Trends */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.6
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Performance Trends</h3>
                  <BarChart3 className="w-5 h-5 text-white/60" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">This Week</span>
                    <span className="text-green-400 font-medium">+12.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">This Month</span>
                    <span className="text-green-400 font-medium">+8.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Budget Efficiency</span>
                    <span className="text-yellow-400 font-medium">94%</span>
                  </div>
                </div>
              </motion.div>

              {/* Alerts & Recommendations */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.7
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Alerts & Recommendations</h3>
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm">Social Amplification campaign underperforming</p>
                      <p className="text-white/60 text-xs">Consider budget reallocation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm">Q4 Product Launch exceeding targets</p>
                      <p className="text-white/60 text-xs">Scale budget by 25%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm">CIA intelligence update available</p>
                      <p className="text-white/60 text-xs">New optimization opportunities</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Chat Bar */}
            <div className="mt-8 pb-8">
              <PersistentChatBar onSendMessage={handleSendMessage} placeholder="Ask Campaign Assistant anything…" />
            </div>
          </motion.div>
        </div>
      </main>
    </div>;
};
export default CampaignCenterPage;