"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../shared/PageLayout';
import { perfectCardShadow, glassCardStyles } from '../../lib/utils';
import { CheckCircle, Heart, BarChart3, Users, MessageCircle, TrendingUp, ArrowUpRight, ArrowDownRight, ArrowRight, Zap, Calendar, Link, Search, PieChart, Info, X } from 'lucide-react';

const metrics = [
  {
    label: 'Content Clusters Generated',
    value: 24,
    delta: '+18.3%',
    icon: <BarChart3 className="w-6 h-6 text-pink-300" />,
    percent: 92,
    color: 'bg-pink-500',
    deltaColor: 'text-green-400',
  },
  {
    label: 'Publishing Success Rate',
    value: '94%',
    delta: '+5.2%',
    icon: <CheckCircle className="w-6 h-6 text-green-300" />,
    percent: 94,
    color: 'bg-green-500',
    deltaColor: 'text-green-400',
  },
  {
    label: 'Social Engagement Rate',
    value: '7.8%',
    delta: '+12.7%',
    icon: <Heart className="w-6 h-6 text-pink-200" />,
    percent: 78,
    color: 'bg-pink-400',
    deltaColor: 'text-green-400',
  },
  {
    label: 'Content Formats Created',
    value: 156,
    delta: '+23.4%',
    icon: <MessageCircle className="w-6 h-6 text-yellow-200" />,
    percent: 88,
    color: 'bg-yellow-400',
    deltaColor: 'text-green-400',
  },
  {
    label: 'CIA Intelligence Sessions',
    value: 18,
    delta: '+15.7%',
    icon: <PieChart className="w-6 h-6 text-blue-200" />,
    percent: 80,
    color: 'bg-blue-400',
    deltaColor: 'text-green-400',
  },
  {
    label: 'Active Campaigns',
    value: 7,
    delta: '+2.1%',
    icon: <TrendingUp className="w-6 h-6 text-blue-300" />,
    percent: 70,
    color: 'bg-blue-500',
    deltaColor: 'text-green-400',
  },
];

const socialPerformance = [
  { platform: 'Instagram', followers: '125.0K', engagement: '5.2%' },
  { platform: 'TikTok', followers: '89.0K', engagement: '12.1%' },
  { platform: 'LinkedIn', followers: '45.8K', engagement: '6.8%' },
  { platform: 'Facebook', followers: '67.0K', engagement: '4.2%' },
];

const pipeline = [
  { label: 'Weekly Content Clusters', value: 24 },
  { label: 'Content Pieces Generated', value: 156 },
  { label: 'Publishing Success Rate', value: '94%' },
  { label: 'Content Approval Status', value: 3, sub: 'Pending review' },
];

const contentPerformance = [
  {
    cluster: 'Customer Success Stories',
    date: '2024-01-16',
    format: 'Epic Pillar',
    status: 'Published',
    engagement: '2.3K',
    cia: '9.2/10',
    authority: 'High',
    cross: true,
    approval: 'Approved',
  },
  {
    cluster: 'Product Demo Series',
    date: '2024-01-14',
    format: 'TikTok UGC',
    status: 'Scheduled',
    engagement: 'Pending',
    cia: '7.8/10',
    authority: 'Medium',
    cross: true,
    approval: 'Approved',
  },
  {
    cluster: 'Authority Insights',
    date: '2024-01-13',
    format: 'LinkedIn Article',
    status: 'Published',
    engagement: '1.8K',
    cia: '8.9/10',
    authority: 'Very High',
    cross: true,
    approval: 'Approved',
  },
  {
    cluster: 'Industry Analysis',
    date: '2024-01-12',
    format: 'Blog Post',
    status: 'In Review',
    engagement: 'Pending',
    cia: '8.1/10',
    authority: 'High',
    cross: true,
    approval: 'Pending',
  },
  {
    cluster: 'Behind the Scenes',
    date: '2024-01-11',
    format: 'Instagram Story',
    status: 'Published',
    engagement: '3.1K',
    cia: '7.9/10',
    authority: 'Medium',
    cross: true,
    approval: 'Approved',
  },
];

const aiRecommendations = [
  {
    title: 'CIA Pain Point Analysis',
    text: 'CIA Analysis identified “customer onboarding friction” – your content addressing this gets 40% higher engagement. Generate 2 more pieces targeting this pain point.',
    color: 'text-green-300',
    bg: 'bg-green-900/30',
  },
  {
    title: 'Authority Positioning Insights',
    text: 'Authority positioning from CIA Phase 1C suggests focusing on “automation expertise” area. This aligns with your highest-performing content themes.',
    color: 'text-blue-300',
    bg: 'bg-blue-900/30',
  },
  {
    title: 'Customer Psychology Insights',
    text: 'Customer psychology insights show audience responds best to testimonial-driven content. Your success story format has 3x higher conversion rates.',
    color: 'text-purple-300',
    bg: 'bg-purple-900/30',
  },
  {
    title: 'CIA Intelligence Integration',
    text: 'Content with CIA scores above 9.0 generates 65% more authority impact. Focus on deeper intelligence integration for maximum positioning effect.',
    color: 'text-yellow-300',
    bg: 'bg-yellow-900/30',
  },
];

const contentBreakdown = [
  { label: 'Authority Articles', engagement: '8.4%', percent: 92 },
  { label: 'Case Studies', engagement: '12.1%', percent: 88 },
  { label: 'LinkedIn Posts', engagement: '6.2%', percent: 76 },
  { label: 'Email Campaigns', engagement: '24.3%', percent: 84 },
  { label: 'Video Content', engagement: '9.8%', percent: 71 },
];

const PerformancePage: React.FC = () => {
  const [barWidths, setBarWidths] = useState(Array(metrics.length).fill(0));
  const [breakdownWidths, setBreakdownWidths] = useState(Array(contentBreakdown.length).fill(0));

  useEffect(() => {
    setTimeout(() => {
      setBarWidths(metrics.map(m => m.percent));
      setBreakdownWidths(contentBreakdown.map(b => b.percent));
    }, 300);
  }, []);

  return (
    <PageLayout pageTitle="Performance Analytics" placeholder="Ask about performance metrics...">
      {/* Pink gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-500 via-pink-600 to-pink-800 -z-10" />
      <div className="min-h-screen w-full flex flex-col relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg" style={{ paddingLeft: '22px', fontSize: '33px' }}>
            Your tasks are ready to run. Look what we found:
          </h1>

          {/* Top Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {metrics.map((metric, i) => (
              <div key={metric.label} className={glassCardStyles + ' p-5 flex flex-col items-start relative'} style={{ boxShadow: perfectCardShadow }}>
                <div className="flex items-center mb-2">
                  {metric.icon}
                  <span className="ml-2 text-white/80 font-medium text-sm">{metric.label}</span>
                </div>
                <div className="flex items-end w-full justify-between">
                  <span className="text-2xl font-bold text-white">{metric.value}</span>
                  <span className={`ml-2 text-xs font-semibold ${metric.deltaColor}`}>{metric.delta}</span>
                </div>
                {/* Animated Progress Bar */}
                <div className="w-full h-2 mt-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: barWidths[i] + '%' }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                    className={`h-full rounded-full ${metric.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Content Performance Breakdown (Animated Bars) */}
          <div className={glassCardStyles + ' p-6 mb-8'} style={{ boxShadow: perfectCardShadow, background: 'linear-gradient(120deg, #7c3aed 0%, #06b6d4 100%)', color: 'white' }}>
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-white mr-2" />
              <h3 className="text-lg font-bold">Content Performance Breakdown</h3>
            </div>
            <div className="space-y-4">
              {contentBreakdown.map((item, i) => (
                <div key={item.label} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span>{item.label}</span>
                    <span className="font-semibold">{item.engagement} engagement</span>
                  </div>
                  <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: breakdownWidths[i] + '%' }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-end pr-3"
                    >
                      <span className="text-xs font-medium text-white">{item.percent}%</span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GHL Social Performance & Content Generation Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={glassCardStyles + ' p-6'} style={{ boxShadow: perfectCardShadow }}>
              <h3 className="text-lg font-bold text-white mb-4">GHL Social Performance</h3>
              <div className="space-y-2">
                {socialPerformance.map((item, i) => (
                  <div key={item.platform} className="flex items-center justify-between text-white/80">
                    <span>{item.platform}</span>
                    <span className="text-white/60">{item.followers} followers</span>
                    <span className="text-pink-200 font-semibold">{item.engagement} engagement</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={glassCardStyles + ' p-6'} style={{ boxShadow: perfectCardShadow }}>
              <h3 className="text-lg font-bold text-white mb-4">Content Generation Pipeline</h3>
              <div className="space-y-2">
                {pipeline.map((item, i) => (
                  <div key={item.label} className="flex items-center justify-between text-white/80">
                    <span>{item.label}</span>
                    <span className="text-white font-semibold">{item.value}</span>
                    {item.sub && <span className="text-xs text-pink-200 ml-2">{item.sub}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Performance Table */}
          <div className={glassCardStyles + ' p-6 mb-8'} style={{ boxShadow: perfectCardShadow }}>
            <h3 className="text-lg font-bold text-white mb-4">Brand BOS Content Performance</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-white/90">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 px-3 text-left">Content Cluster</th>
                    <th className="py-2 px-3 text-left">Format Type</th>
                    <th className="py-2 px-3 text-left">Publishing Status</th>
                    <th className="py-2 px-3 text-left">Social Engagement</th>
                    <th className="py-2 px-3 text-left">CIA Score</th>
                    <th className="py-2 px-3 text-left">Authority Impact</th>
                    <th className="py-2 px-3 text-left">Cross-Platform</th>
                    <th className="py-2 px-3 text-left">Approval Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contentPerformance.map((row, i) => (
                    <tr key={row.cluster} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-2 px-3 font-semibold text-pink-200">{row.cluster}<div className="text-xs text-white/50">{row.date}</div></td>
                      <td className="py-2 px-3">{row.format}</td>
                      <td className="py-2 px-3">{row.status}</td>
                      <td className="py-2 px-3">{row.engagement}</td>
                      <td className="py-2 px-3">{row.cia}</td>
                      <td className="py-2 px-3">{row.authority}</td>
                      <td className="py-2 px-3">
                        {row.cross ? <a href="#" className="text-pink-200 underline">Connect Analytics</a> : '-'}
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${row.approval === 'Approved' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{row.approval}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Connect Analytics / Search Console */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={glassCardStyles + ' p-6 flex flex-col items-center justify-center'} style={{ boxShadow: perfectCardShadow }}>
              <PieChart className="w-10 h-10 text-pink-200 mb-2" />
              <h4 className="text-white font-semibold mb-2">Connect Google Analytics</h4>
              <p className="text-white/70 mb-4 text-center">Get website traffic data and conversion insights</p>
              <button className="px-4 py-2 bg-pink-500/80 hover:bg-pink-600 text-white rounded-lg transition-colors font-semibold">Connect Analytics</button>
            </div>
            <div className={glassCardStyles + ' p-6 flex flex-col items-center justify-center'} style={{ boxShadow: perfectCardShadow }}>
              <Search className="w-10 h-10 text-pink-200 mb-2" />
              <h4 className="text-white font-semibold mb-2">Connect Search Console</h4>
              <p className="text-white/70 mb-4 text-center">Track SEO performance and search rankings</p>
              <button className="px-4 py-2 bg-pink-500/80 hover:bg-pink-600 text-white rounded-lg transition-colors font-semibold">Connect Console</button>
            </div>
          </div>

          {/* AI Content Optimization Recommendations */}
          <div className={glassCardStyles + ' p-6 mb-8'} style={{ boxShadow: perfectCardShadow }}>
            <h3 className="text-lg font-bold text-white mb-4">AI Content Optimization Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiRecommendations.map((rec, i) => (
                <div key={rec.title} className={`rounded-lg p-4 ${rec.bg} ${rec.color} font-medium`}> 
                  <div className="font-semibold mb-1">{rec.title}</div>
                  <div className="text-white/80 text-sm font-normal">{rec.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PerformancePage;