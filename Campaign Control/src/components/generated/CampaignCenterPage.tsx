"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, DollarSign, FileText, Target, TrendingUp, Users, BarChart3, Zap, ChevronDown, Plus, Settings, AlertTriangle, CheckCircle, Clock, Play, Pause, Edit3, MoreHorizontal, Lightbulb, Megaphone, Calendar } from 'lucide-react';
import SidebarNavigation from './SidebarNavigation';
import PersistentChatBar from './PersistentChatBar';
interface CampaignMetrics {
  budget: number;
  conversions: number;
  roi: number;
  reach?: number;
  engagement?: number;
  authorityScore?: number;
  status?: string;
}
interface Campaign {
  id: string;
  name: string;
  type: 'content-cluster' | 'google-grant' | 'humbleboast' | 'authority';
  status: 'active' | 'scheduled' | 'completed' | 'ready';
  metrics: CampaignMetrics;
  description?: string;
}
const CampaignCenterPage: React.FC = () => {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const handleSendMessage = (message: string) => {
    console.log('Campaign Assistant message:', message);
  };
  const dashboardMetrics = {
    contentClusters: {
      activeCampaigns: 8,
      weeklyReach: 125000,
      engagementRate: 7.2,
      authorityBuilding: 89
    },
    googleGrant: {
      totalBudget: 10000,
      allocated: 10000,
      efficiency: 94,
      campaignsActive: 4
    },
    humbleboastBriefs: {
      generated: 23,
      readyForFacebook: 12,
      estimatedReach: 180000,
      conversionPotential: 8.5
    },
    authorityScore: {
      current: 87,
      weeklyGrowth: 12,
      monthlyGrowth: 34,
      industryRanking: 'Top 15%'
    }
  };
  const campaigns: Campaign[] = [{
    id: '1',
    name: 'Customer Success Authority',
    type: 'content-cluster',
    status: 'active',
    metrics: {
      budget: 2500,
      conversions: 0,
      roi: 0,
      reach: 45000,
      engagement: 8.2,
      authorityScore: 89
    },
    description: 'Weekly content cluster driving customer success narratives'
  }, {
    id: '2',
    name: 'Product Demo Series',
    type: 'content-cluster',
    status: 'active',
    metrics: {
      budget: 2500,
      conversions: 0,
      roi: 0,
      reach: 38000,
      engagement: 6.8,
      authorityScore: 76
    },
    description: 'Product demonstration content cluster'
  }, {
    id: '3',
    name: 'Industry Insights',
    type: 'google-grant',
    status: 'active',
    metrics: {
      budget: 2500,
      conversions: 45,
      roi: 156,
      reach: 0,
      engagement: 0
    },
    description: 'Google Ad Grant campaign targeting industry keywords'
  }, {
    id: '4',
    name: 'CEO Thought Leadership',
    type: 'humbleboast',
    status: 'ready',
    metrics: {
      budget: 0,
      conversions: 0,
      roi: 0,
      reach: 50000
    },
    description: 'Testimonial brief ready for Facebook ad creation'
  }, {
    id: '5',
    name: 'Authority Building Campaign',
    type: 'content-cluster',
    status: 'scheduled',
    metrics: {
      budget: 2500,
      conversions: 0,
      roi: 0,
      reach: 0,
      engagement: 0,
      authorityScore: 92
    },
    description: 'Next week\'s authority-focused content cluster'
  }, {
    id: '6',
    name: 'Competitive Intelligence',
    type: 'google-grant',
    status: 'completed',
    metrics: {
      budget: 2500,
      conversions: 78,
      roi: 198,
      reach: 0,
      engagement: 0
    },
    description: 'Completed Google Grant campaign with strong performance'
  }, {
    id: '7',
    name: 'Customer Testimonial Series',
    type: 'humbleboast',
    status: 'ready',
    metrics: {
      budget: 0,
      conversions: 0,
      roi: 0,
      reach: 45000
    },
    description: 'Authority brief ready for Facebook ad creation'
  }];
  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'bg-white/20 text-white border-white/30';
      case 'scheduled':
        return 'bg-white/20 text-white border-white/30';
      case 'completed':
        return 'bg-white/20 text-white border-white/30';
      case 'ready':
        return 'bg-white/20 text-white border-white/30';
      default:
        return 'bg-white/20 text-white border-white/30';
    }
  };
  const getROIColor = (roi: number) => {
    return 'text-white';
  };
  const getCampaignIcon = (type: Campaign['type']) => {
    switch (type) {
      case 'content-cluster':
        return <Users className="w-8 h-8 text-white" />;
      case 'google-grant':
        return <DollarSign className="w-8 h-8 text-white" />;
      case 'humbleboast':
        return <Megaphone className="w-8 h-8 text-white" />;
      case 'authority':
        return <Target className="w-8 h-8 text-white" />;
      default:
        return <BarChart3 className="w-8 h-8 text-white" />;
    }
  };
  return <div className="min-h-screen w-full flex bg-gradient-to-br from-pink-600 via-pink-700 to-pink-800">
      {/* Pink gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-600 via-pink-700 to-pink-800 -z-10" />
      
      {/* Left Sidebar */}
      <SidebarNavigation />
      
      {/* Professional Services 24px Standard Gap */}
      <div className="hidden md:block flex-shrink-0" style={{ width: "24px" }} />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative min-h-screen">
        {/* Main Content Container */}
        <div className="flex-1 pl-4 pr-4 md:pl-0 md:pr-6 lg:pr-8 pt-6 sm:pt-8 pb-6 sm:pb-8 overflow-auto">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-0">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }}>
            {/* Header */}
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-lg pl-6 leading-tight">Campaign Center</h1>
              <p className="text-white/90 pl-6 leading-tight">
                Manage Brand BOS campaigns powered by CIA intelligence and content clusters
              </p>
            </header>

            {/* Dashboard Metrics Cards */}
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              {/* Active Content Clusters */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold leading-tight">Active Content Clusters</h3>
                      <p className="text-white/70 text-sm leading-tight">Weekly Campaigns</p>
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between leading-tight">
                    <span className="text-white/80">Running:</span>
                    <span className="text-white font-medium">{dashboardMetrics.contentClusters.activeCampaigns}</span>
                  </div>
                  <div className="flex justify-between leading-tight">
                    <span className="text-white/80">Weekly Reach:</span>
                    <span className="text-white font-medium">{(dashboardMetrics.contentClusters.weeklyReach / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between leading-tight">
                    <span className="text-white/80">Engagement:</span>
                    <span className="text-white font-medium">{dashboardMetrics.contentClusters.engagementRate}%</span>
                  </div>
                </div>
              </motion.div>

              {/* Google Ad Grant Budget */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold leading-tight">Google Ad Grant</h3>
                      <p className="text-white/70 text-sm leading-tight">Budget Allocation</p>
                    </div>
                  </div>
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between leading-tight">
                    <span className="text-white/80">Total Budget:</span>
                    <span className="text-white font-medium">${dashboardMetrics.googleGrant.totalBudget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between leading-tight">
                    <span className="text-white/80">Allocated:</span>
                    <span className="text-white font-medium">${dashboardMetrics.googleGrant.allocated.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between leading-tight">
                    <span className="text-white/80">Efficiency:</span>
                    <span className="text-white font-medium">{dashboardMetrics.googleGrant.efficiency}%</span>
                  </div>
                </div>
              </motion.div>

              {/* Humbleboast Briefs */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold leading-tight">Humbleboast Briefs</h3>
                      <p className="text-white/70 text-sm leading-tight">Facebook Ad Concepts</p>
                    </div>
                  </div>
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between leading-tight">
                    <span className="text-white/80">Generated:</span>
                    <span className="text-white font-medium">{dashboardMetrics.humbleboastBriefs.generated}</span>
                  </div>
                  <div className="flex justify-between leading-tight">
                    <span className="text-white/80">Ready:</span>
                    <span className="text-white font-medium">{dashboardMetrics.humbleboastBriefs.readyForFacebook}</span>
                  </div>
                  <div className="flex justify-between leading-tight">
                    <span className="text-white/80">Est. Reach:</span>
                    <span className="text-white font-medium">{(dashboardMetrics.humbleboastBriefs.estimatedReach / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </motion.div>

              {/* Authority Impact Score */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold leading-tight">Authority Impact</h3>
                      <p className="text-white/70 text-sm leading-tight">Campaign Effectiveness</p>
                    </div>
                  </div>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between leading-tight">
                    <span className="text-white/80">Score:</span>
                    <span className="text-white font-medium">{dashboardMetrics.authorityScore.current}/100</span>
                  </div>
                  <div className="flex justify-between leading-tight">
                    <span className="text-white/80">Weekly:</span>
                    <span className="text-white font-medium">+{dashboardMetrics.authorityScore.weeklyGrowth}%</span>
                  </div>
                  <div className="flex justify-between leading-tight">
                    <span className="text-white/80">Ranking:</span>
                    <span className="text-white font-medium">{dashboardMetrics.authorityScore.industryRanking}</span>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Quick Actions Bar */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 mb-6 shadow-xl">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl" style={{
                  color: "#ed5927"
                }}>
                    <Brain className="w-4 h-4 mr-2 text-gray-900" style={{
                    color: "ed5927"
                  }} />
                    Generate Campaign from CIA Intelligence
                  </button>
                  <button className="flex items-center px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl" style={{
                  color: "#e95928"
                }}>
                    <Megaphone className="w-4 h-4 mr-2 text-gray-900" style={{
                    color: "ed5927"
                  }} />
                    Create Humbleboast Brief
                  </button>
                  <button className="flex items-center px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl" style={{
                  color: "#ec5827"
                }}>
                    <Users className="w-4 h-4 mr-2 text-gray-900" style={{
                    color: "ed5927"
                  }} />
                    Launch Content Cluster Campaign
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all duration-200">
                    Bulk Actions
                    <ChevronDown className="w-4 h-4 ml-2 text-white" />
                  </button>
                  <button className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-200">
                    <Settings className="w-4 h-4 text-white" />
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
            delay: 0.6
          }} className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white leading-tight">Brand BOS Campaigns</h2>
                <div className="flex items-center gap-3">
                  <span className="text-white/70 text-sm">{campaigns.length} campaigns</span>
                  <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm transition-all duration-200">
                    <Plus className="w-4 h-4 mr-2 text-white" />
                    New Campaign
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                    <div className="h-20 bg-gradient-to-r from-white/20 to-white/10 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                        {getCampaignIcon(campaign.type)}
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Campaign Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 leading-tight">
                            {campaign.name}
                          </h3>
                          <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Campaign Type */}
                      <div className="mb-2">
                        <span className="text-white/70 text-xs leading-tight">
                          {campaign.type === 'content-cluster' && 'Content Cluster'}
                          {campaign.type === 'google-grant' && 'Google Ad Grant'}
                          {campaign.type === 'humbleboast' && 'Humbleboast Brief'}
                          {campaign.type === 'authority' && 'Authority Campaign'}
                        </span>
                      </div>

                      {/* Metrics */}
                      <div className="space-y-1 mb-3">
                        {/* Content Cluster Campaigns */}
                        {campaign.type === 'content-cluster' && <>
                            <div className="flex justify-between text-sm leading-tight">
                              <span className="text-white/70">Budget:</span>
                              <span className="text-white">
                                ${campaign.metrics.budget}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm leading-tight">
                              <span className="text-white/70">Reach:</span>
                              <span className="text-white">
                                {campaign.metrics.reach ? `${(campaign.metrics.reach / 1000).toFixed(0)}K` : 'Scheduled'}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm leading-tight">
                              <span className="text-white/70">Authority Score:</span>
                              <span className="text-white font-medium">
                                {campaign.metrics.authorityScore || 'TBD'}
                              </span>
                            </div>
                          </>}

                        {/* Humbleboast Brief Campaigns */}
                        {campaign.type === 'humbleboast' && <>
                            <div className="flex justify-between text-sm leading-tight">
                              <span className="text-white/70">Status:</span>
                              <span className="text-white">
                                Ready for Facebook
                              </span>
                            </div>
                            <div className="flex justify-between text-sm leading-tight">
                              <span className="text-white/70">Est. Reach:</span>
                              <span className="text-white">
                                {(campaign.metrics.reach || 0) / 1000}K
                              </span>
                            </div>
                            <div className="flex justify-between text-sm leading-tight">
                              <span className="text-white/70">Brief Type:</span>
                              <span className="text-white font-medium">
                                {campaign.description?.includes('Testimonial') ? 'Testimonial' : 'Authority'}
                              </span>
                            </div>
                          </>}

                        {/* Google Ad Grant Campaigns */}
                        {campaign.type === 'google-grant' && <>
                            <div className="flex justify-between text-sm leading-tight">
                              <span className="text-white/70">Budget:</span>
                              <span className="text-white">
                                ${campaign.metrics.budget}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm leading-tight">
                              <span className="text-white/70">Conversions:</span>
                              <span className="text-white">
                                {campaign.metrics.conversions}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm leading-tight">
                              <span className="text-white/70">ROI:</span>
                              <span className={`font-medium ${getROIColor(campaign.metrics.roi)}`}>
                                {campaign.metrics.roi}%
                              </span>
                            </div>
                          </>}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button className="flex-1 flex items-center justify-center px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-xs transition-all duration-200">
                          <Edit3 className="w-3 h-3 mr-1 text-white" />
                          Edit
                        </button>
                        <button className="flex items-center justify-center p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200">
                          {campaign.status === 'scheduled' ? <Play className="w-3 h-3 text-white" /> : <Pause className="w-3 h-3 text-white" />}
                        </button>
                        <button className="flex items-center justify-center p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-200">
                          <MoreHorizontal className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    </div>
                  </motion.div>)}
              </div>
            </motion.div>

            {/* Performance Overview & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {/* Performance Trends */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.7
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold leading-tight">Authority Building Progress</h3>
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between leading-tight">
                    <span className="text-white/80">Content Cluster Performance</span>
                    <span className="text-white font-medium">+15.2%</span>
                  </div>
                  <div className="flex items-center justify-between leading-tight">
                    <span className="text-white/80">Google Ad Grant Efficiency</span>
                    <span className="text-white font-medium">+8.7%</span>
                  </div>
                  <div className="flex items-center justify-between leading-tight">
                    <span className="text-white/80">Cross-Platform Attribution</span>
                    <span className="text-white font-medium">92%</span>
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
              delay: 0.8
            }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold leading-tight">Brand BOS Alerts</h3>
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Brain className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm leading-tight">New CIA intelligence available for campaign optimization</p>
                      <p className="text-white/70 text-xs leading-tight">3 new opportunities identified</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm leading-tight">Google Ad Grant budget rotation recommended</p>
                      <p className="text-white/70 text-xs leading-tight">Optimize for Q1 performance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm leading-tight">Content Cluster #3 exceeding performance targets</p>
                      <p className="text-white/70 text-xs leading-tight">Consider scaling budget allocation</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Chat Bar */}
            <div className="mt-6 pb-6">
              <PersistentChatBar onSendMessage={handleSendMessage} placeholder="Ask Campaign Assistant about Brand BOS strategies…" />
            </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>;
};
export default CampaignCenterPage;