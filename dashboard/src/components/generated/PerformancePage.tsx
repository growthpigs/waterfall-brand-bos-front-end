'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  Share2,
  DollarSign,
  Target,
  ArrowUp,
  ArrowDown,
  Minus,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import ProfessionalLayout from '../shared/ProfessionalLayout';
import ProfessionalSidebarNavigation from '../professional/ProfessionalSidebarNavigation';
import PersistentChatBar from './PersistentChatBar';
interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<{
    className?: string;
  }>;
  color: string;
}
interface ContentPerformance {
  id: string;
  contentCluster: string;
  formatType: string;
  publishingStatus: string;
  socialEngagement: string;
  approvalStatus: string;
  ciaScore: number;
  authorityImpact: string;
  crossPlatformPerformance?: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
}
interface PlatformMetric {
  platform: string;
  followers: number;
  engagement: number;
  postsPublished: number;
  growth: number;
}
interface PerformancePageProps {
  onNavigate?: (pageId: string) => void;
}

const PerformancePage: React.FC<PerformancePageProps> = ({ onNavigate }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [sortBy, setSortBy] = useState('engagement');
  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
  };
  const metricCards: MetricCard[] = [
    {
      id: 'content-clusters',
      title: 'Content Clusters Generated',
      value: '24',
      change: 18.3,
      trend: 'up',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'publishing-success',
      title: 'Publishing Success Rate',
      value: '94%',
      change: 5.2,
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'social-engagement',
      title: 'Social Engagement Rate',
      value: '7.8%',
      change: 12.7,
      trend: 'up',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'content-formats',
      title: 'Content Formats Created',
      value: '156',
      change: 23.4,
      trend: 'up',
      icon: Target,
      color: 'from-purple-500 to-violet-500',
    },
    {
      id: 'cia-sessions',
      title: 'CIA Intelligence Sessions',
      value: '18',
      change: 15.7,
      trend: 'up',
      icon: Eye,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'active-campaigns',
      title: 'Active Campaigns',
      value: '7',
      change: 2.1,
      trend: 'stable',
      icon: TrendingUp,
      color: 'from-indigo-500 to-blue-500',
    },
  ];
  const contentPerformance: ContentPerformance[] = [
    {
      id: '1',
      contentCluster: 'Customer Success Stories',
      formatType: 'Epic Pillar',
      publishingStatus: 'Published',
      socialEngagement: '2.3K engagements',
      approvalStatus: 'Approved',
      ciaScore: 9.2,
      authorityImpact: 'High',
      crossPlatformPerformance: 'Connect Analytics',
      date: '2024-01-15',
      trend: 'up',
    },
    {
      id: '2',
      contentCluster: 'Product Demo Series',
      formatType: 'TikTok UGC',
      publishingStatus: 'Scheduled',
      socialEngagement: 'Pending',
      approvalStatus: 'Approved',
      ciaScore: 7.8,
      authorityImpact: 'Medium',
      crossPlatformPerformance: 'Connect Analytics',
      date: '2024-01-14',
      trend: 'up',
    },
    {
      id: '3',
      contentCluster: 'Authority Insights',
      formatType: 'LinkedIn Article',
      publishingStatus: 'Published',
      socialEngagement: '1.8K engagements',
      approvalStatus: 'Approved',
      ciaScore: 9.5,
      authorityImpact: 'Very High',
      crossPlatformPerformance: 'Connect Analytics',
      date: '2024-01-13',
      trend: 'up',
    },
    {
      id: '4',
      contentCluster: 'Industry Analysis',
      formatType: 'Blog Post',
      publishingStatus: 'In Review',
      socialEngagement: 'Pending',
      approvalStatus: 'Pending',
      ciaScore: 8.1,
      authorityImpact: 'High',
      crossPlatformPerformance: 'Connect Analytics',
      date: '2024-01-12',
      trend: 'stable',
    },
    {
      id: '5',
      contentCluster: 'Behind the Scenes',
      formatType: 'Instagram Story',
      publishingStatus: 'Published',
      socialEngagement: '3.1K engagements',
      approvalStatus: 'Approved',
      ciaScore: 6.9,
      authorityImpact: 'Medium',
      crossPlatformPerformance: 'Connect Analytics',
      date: '2024-01-11',
      trend: 'up',
    },
  ];
  const platformMetrics: PlatformMetric[] = [
    {
      platform: 'Instagram',
      followers: 125000,
      engagement: 5.3,
      postsPublished: 28,
      growth: 12.3,
    },
    {
      platform: 'TikTok',
      followers: 89000,
      engagement: 12.1,
      postsPublished: 15,
      growth: 18.7,
    },
    {
      platform: 'LinkedIn',
      followers: 45800,
      engagement: 6.8,
      postsPublished: 22,
      growth: 8.9,
    },
    {
      platform: 'Facebook',
      followers: 67000,
      engagement: 4.2,
      postsPublished: 18,
      growth: 5.4,
    },
  ];
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return (
          <ArrowUp
            className="w-4 h-4 text-green-400"
            style={{
              borderWidth: '0px',
              borderStyle: 'solid',
              borderColor: 'oklch(98.67% 0.01 17.54deg)',
              borderRadius: '0px',
              color: 'oklch(100% 0 none)',
            }}
          />
        );
      case 'down':
        return <ArrowDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-blue-400" />;
    }
  };
  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'in review':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };
  const getCiaScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-400';
    if (score >= 7) return 'text-yellow-400';
    return 'text-red-400';
  };
  const getAuthorityImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'very high':
        return 'text-green-400';
      case 'high':
        return 'text-blue-400';
      case 'medium':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };
  return (
    <ProfessionalLayout
      theme="blue"
      sidebar={<ProfessionalSidebarNavigation onNavigate={() => {}} activePageId="performance" />}
    >
      <main className="flex-1 flex flex-col relative min-h-screen">
        {/* Main Content Container */}
        <div className="flex-1 pl-0 pr-8 pt-8 overflow-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="max-w-7xl"
          >
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                  Brand BOS Performance
                </h1>
                <p className="text-white/70 text-lg">
                  Track your content generation and social publishing performance
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                <select
                  value={selectedTimeRange}
                  onChange={e => setSelectedTimeRange(e.target.value)}
                  className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="24h" className="bg-gray-800">
                    Last 24 hours
                  </option>
                  <option value="7d" className="bg-gray-800">
                    Last 7 days
                  </option>
                  <option value="30d" className="bg-gray-800">
                    Last 30 days
                  </option>
                  <option value="90d" className="bg-gray-800">
                    Last 90 days
                  </option>
                </select>

                <button className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 text-white text-sm hover:bg-white/30 transition-colors flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>

                <button className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 text-white text-sm hover:bg-white/30 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {metricCards.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    className="glass-card"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center gap-1 ${getTrendColor(metric.trend)}`}>
                        {getTrendIcon(metric.trend)}
                        <span
                          className="text-sm font-medium"
                          style={{
                            borderWidth: '0px',
                            borderStyle: 'solid',
                            borderColor: 'oklch(100% 0 none)',
                            borderRadius: '0px',
                            color: 'oklch(99.9% 0 144.31deg)',
                          }}
                        >
                          {metric.change > 0 ? '+' : ''}
                          {metric.change}%
                        </span>
                      </div>
                    </div>

                    <h3 className="text-white/70 text-sm font-medium mb-1">{metric.title}</h3>
                    <p className="text-white text-2xl font-bold">{metric.value}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Analytics Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* GHL Social Performance */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                }}
                className="glass-card"
              >
                <h3 className="text-white text-xl font-semibold mb-4">GHL Social Performance</h3>
                <div className="space-y-4">
                  {platformMetrics.map(platform => (
                    <div key={platform.platform} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-500" />
                        <span className="text-white/80 text-sm">{platform.platform}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm font-medium">
                          {formatNumber(platform.followers)} followers
                        </div>
                        <div className="text-white/60 text-xs">
                          {platform.engagement}% engagement
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Content Generation Pipeline */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                }}
                className="glass-card"
              >
                <h3 className="text-white text-xl font-semibold mb-4">
                  Content Generation Pipeline
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Weekly Content Clusters</p>
                      <p className="text-white/60 text-xs">Created this week</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/80 text-sm">24</span>
                      <ArrowUp className="w-4 h-4 text-green-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Content Pieces Generated</p>
                      <p className="text-white/60 text-xs">All formats combined</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/80 text-sm">156</span>
                      <ArrowUp className="w-4 h-4 text-green-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Publishing Success Rate</p>
                      <p className="text-white/60 text-xs">Successfully published</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/80 text-sm">94%</span>
                      <ArrowUp className="w-4 h-4 text-green-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Content Approval Status</p>
                      <p className="text-white/60 text-xs">Pending review</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/80 text-sm">3</span>
                      <Clock className="w-4 h-4 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content Performance Table */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.5,
              }}
              className="glass-card mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-xl font-semibold">Brand BOS Content Performance</h3>
                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="engagement" className="bg-gray-800">
                      Sort by Engagement
                    </option>
                    <option value="status" className="bg-gray-800">
                      Sort by Status
                    </option>
                    <option value="format" className="bg-gray-800">
                      Sort by Format
                    </option>
                    <option value="date" className="bg-gray-800">
                      Sort by Date
                    </option>
                  </select>
                  <button className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-3 py-1 text-white text-sm hover:bg-white/30 transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white/70 text-sm font-medium py-3">
                        Content Cluster
                      </th>
                      <th className="text-left text-white/70 text-sm font-medium py-3">
                        Format Type
                      </th>
                      <th className="text-left text-white/70 text-sm font-medium py-3">
                        Publishing Status
                      </th>
                      <th className="text-left text-white/70 text-sm font-medium py-3">
                        Social Engagement
                      </th>
                      <th className="text-left text-white/70 text-sm font-medium py-3">
                        CIA Score
                      </th>
                      <th className="text-left text-white/70 text-sm font-medium py-3">
                        Authority Impact
                      </th>
                      <th className="text-left text-white/70 text-sm font-medium py-3">
                        Cross-Platform
                      </th>
                      <th className="text-left text-white/70 text-sm font-medium py-3">
                        Approval Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contentPerformance.map(content => (
                      <tr
                        key={content.id}
                        className="border-b border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <td className="py-4">
                          <p className="text-white text-sm font-medium">{content.contentCluster}</p>
                          <p className="text-white/60 text-xs">{content.date}</p>
                        </td>
                        <td className="py-4">
                          <span className="text-white/80 text-sm">{content.formatType}</span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(content.publishingStatus)}
                            <span className="text-white/80 text-sm">
                              {content.publishingStatus}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-white text-sm">{content.socialEngagement}</span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
                            <span
                              className={`text-sm font-medium ${getCiaScoreColor(content.ciaScore)}`}
                            >
                              {content.ciaScore}/10
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span
                            className={`text-sm font-medium ${getAuthorityImpactColor(content.authorityImpact)}`}
                          >
                            {content.authorityImpact}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-gray-400 text-sm">
                            {content.crossPlatformPerformance}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(content.approvalStatus)}
                            <span className="text-white/80 text-sm">{content.approvalStatus}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Connect Analytics Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                }}
                className="glass-card"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-400/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-gray-300 text-lg font-semibold mb-2">
                    Connect Google Analytics
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Get website traffic data and conversion insights
                  </p>
                  <button className="bg-gray-400/20 border border-gray-400/30 rounded-lg px-4 py-2 text-gray-300 text-sm hover:bg-gray-400/30 transition-colors">
                    Connect Analytics
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.7,
                }}
                className="glass-card"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-400/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-gray-300 text-lg font-semibold mb-2">
                    Connect Search Console
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Track SEO performance and search rankings
                  </p>
                  <button className="bg-gray-400/20 border border-gray-400/30 rounded-lg px-4 py-2 text-gray-300 text-sm hover:bg-gray-400/30 transition-colors">
                    Connect Console
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Attribution Note */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.8,
              }}
              className="glass-small mb-8"
            >
              <p className="text-blue-200 text-sm text-center">
                <strong>Note:</strong> Full attribution tracking available after connecting
                analytics platforms
              </p>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.9,
              }}
              className="glass-card mb-8"
            >
              <h3 className="text-white text-xl font-semibold mb-6">
                AI Content Optimization Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="glass-small bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                    <h4 className="text-green-400 font-medium mb-2">CIA Pain Point Analysis</h4>
                    <p className="text-white/80 text-sm">
                      CIA Analysis identified 'customer onboarding friction' - your content
                      addressing this gets 40% higher engagement. Generate 2 more pieces targeting
                      this pain point.
                    </p>
                  </div>

                  <div className="glass-small bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                    <h4 className="text-blue-400 font-medium mb-2">
                      Authority Positioning Insights
                    </h4>
                    <p className="text-white/80 text-sm">
                      Authority positioning from CIA Phase 1C suggests focusing on 'automation
                      expertise' area. This aligns with your highest-performing content themes.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="glass-small bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30">
                    <h4 className="text-purple-400 font-medium mb-2">
                      Customer Psychology Insights
                    </h4>
                    <p className="text-white/80 text-sm">
                      Customer psychology insights show audience responds best to testimonial-driven
                      content. Your success story format has 3x higher conversion rates.
                    </p>
                  </div>

                  <div className="glass-small bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                    <h4 className="text-yellow-400 font-medium mb-2">
                      CIA Intelligence Integration
                    </h4>
                    <p className="text-white/80 text-sm">
                      Content with CIA scores above 9.0 generates 65% more authority impact. Focus
                      on deeper intelligence integration for maximum positioning effect.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Chat Bar */}
            <div className="mt-8 pb-8">
              <PersistentChatBar onSendMessage={handleSendMessage} />
            </div>
          </motion.div>
        </div>
      </main>
    </ProfessionalLayout>
  );
};
export default PerformancePage;
