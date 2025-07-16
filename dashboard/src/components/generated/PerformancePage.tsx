import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Clock, Award, Target, Activity, Zap } from 'lucide-react';
import HeroCard from '../shared/HeroCard';
import PageLayout from '../shared/PageLayout';
import PageHeader from '../shared/PageHeader';

interface PerformanceMetricProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
}

const PerformanceMetric: React.FC<PerformanceMetricProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  delay = 0
}) => {
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-yellow-400';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <HeroCard className="group hover:shadow-cyan-500/20 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-400/20 group-hover:border-blue-400/30 transition-all duration-300">
          <Icon className="w-6 h-6 text-white/95" />
        </div>
        <span className={`text-sm font-medium ${trendColor}`}>{change}</span>
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-white/95">{value}</div>
        <h3 className="text-lg font-semibold text-white/90">{title}</h3>
      </div>
      </HeroCard>
    </motion.div>
  );
};

const ContentPerformanceChart: React.FC = () => {
  const contentTypes = [
    { type: 'Authority Articles', performance: 92, engagement: '8.4%' },
    { type: 'Case Studies', performance: 88, engagement: '12.1%' },
    { type: 'LinkedIn Posts', performance: 76, engagement: '6.2%' },
    { type: 'Email Campaigns', performance: 84, engagement: '24.3%' },
    { type: 'Video Content', performance: 71, engagement: '9.8%' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <HeroCard>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-400/20">
          <BarChart3 className="w-6 h-6 text-white/95" />
        </div>
        <h3 className="text-xl font-semibold text-white/95">Content Performance Breakdown</h3>
      </div>

      <div className="space-y-4">
        {contentTypes.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/90 font-medium">{item.type}</span>
              <span className="text-white/75">{item.engagement} engagement</span>
            </div>
            <div className="relative w-full bg-black/30 rounded-lg h-8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.performance}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-end pr-3"
              >
                <span className="text-xs font-medium text-white">{item.performance}%</span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      </HeroCard>
    </motion.div>
  );
};

const TopPerformingContent: React.FC = () => {
  const topContent = [
    { title: 'AI Revolution in Financial Services', views: '12.4K', engagement: '8.2%', leads: 47 },
    { title: 'Building Trust Through Authority', views: '9.8K', engagement: '11.3%', leads: 62 },
    { title: 'Case Study: 300% ROI Achievement', views: '8.1K', engagement: '14.7%', leads: 89 },
    { title: 'The Future of Professional Services', views: '7.2K', engagement: '9.1%', leads: 34 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <HeroCard>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-400/20">
          <Award className="w-6 h-6 text-white/95" />
        </div>
        <h3 className="text-xl font-semibold text-white/95">Top Performing Content</h3>
      </div>

      <div className="space-y-3">
        {topContent.map((item, index) => (
          <div
            key={index}
            className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/20 hover:border-blue-400/30 transition-all duration-300"
          >
            <h4 className="font-medium text-white/90 mb-2">{item.title}</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-white/60">Views</span>
                <p className="text-white/90 font-medium">{item.views}</p>
              </div>
              <div>
                <span className="text-white/60">Engagement</span>
                <p className="text-white/90 font-medium">{item.engagement}</p>
              </div>
              <div>
                <span className="text-white/60">Leads</span>
                <p className="text-white/90 font-medium">{item.leads}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </HeroCard>
    </motion.div>
  );
};

const EngagementTimeline: React.FC = () => {
  const timelineData = [
    { day: 'Mon', engagement: 78, optimal: '10 AM' },
    { day: 'Tue', engagement: 92, optimal: '2 PM' },
    { day: 'Wed', engagement: 85, optimal: '11 AM' },
    { day: 'Thu', engagement: 88, optimal: '3 PM' },
    { day: 'Fri', engagement: 76, optimal: '10 AM' },
    { day: 'Sat', engagement: 45, optimal: '12 PM' },
    { day: 'Sun', engagement: 38, optimal: '4 PM' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <HeroCard>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-400/20">
          <Activity className="w-6 h-6 text-white/95" />
        </div>
        <h3 className="text-xl font-semibold text-white/95">Weekly Engagement Pattern</h3>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {timelineData.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-xs text-white/75 mb-2">{item.day}</div>
            <div className="relative h-32 bg-black/20 rounded-lg overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${item.engagement}%` }}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.05 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-lg"
              />
            </div>
            <div className="text-xs text-white/60 mt-2">{item.optimal}</div>
          </div>
        ))}
      </div>
      </HeroCard>
    </motion.div>
  );
};

const PerformancePage: React.FC = () => {
  console.log('[Performance] rendered successfully');
  

  return (
    <PageLayout pageTitle="Performance Analytics" placeholder="Ask about performance metrics...">
      {/* Cyan gradient background with blue accents */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-800 -z-10" />
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-cyan-500/10 -z-10" />
          {/* Header - Global Standard */}
          <PageHeader 
            title="Performance Analytics"
            subtitle="Real-time insights and metrics for your authority building campaigns"
          />

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <PerformanceMetric
              title="Authority Score"
              value="9.2"
              change="+0.8 this month"
              trend="up"
              icon={Award}
              delay={0.1}
            />
            <PerformanceMetric
              title="Content Reach"
              value="324K"
              change="+18% growth"
              trend="up"
              icon={Users}
              delay={0.2}
            />
            <PerformanceMetric
              title="Avg. Engagement"
              value="8.7%"
              change="+2.3% increase"
              trend="up"
              icon={Zap}
              delay={0.3}
            />
            <PerformanceMetric
              title="Response Time"
              value="1.2h"
              change="-15 min faster"
              trend="up"
              icon={Clock}
              delay={0.4}
            />
          </div>

          {/* Performance Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ContentPerformanceChart />
            <TopPerformingContent />
          </div>

          {/* Engagement Timeline */}
          <EngagementTimeline />

          {/* Goals & Targets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            <HeroCard>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-400/20">
                <Target className="w-6 h-6 text-white/95" />
              </div>
              <h3 className="text-xl font-semibold text-white/95">Q4 Goals Progress</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/20">
                <h4 className="font-medium text-white/90 mb-2">Lead Generation</h4>
                <div className="text-2xl font-bold text-white/95 mb-1">842/1000</div>
                <div className="w-full bg-black/30 rounded-lg h-2 overflow-hidden">
                  <div className="w-[84.2%] h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg" />
                </div>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/20">
                <h4 className="font-medium text-white/90 mb-2">Content Published</h4>
                <div className="text-2xl font-bold text-white/95 mb-1">127/150</div>
                <div className="w-full bg-black/30 rounded-lg h-2 overflow-hidden">
                  <div className="w-[84.7%] h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg" />
                </div>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/20">
                <h4 className="font-medium text-white/90 mb-2">Client Satisfaction</h4>
                <div className="text-2xl font-bold text-white/95 mb-1">94.3%</div>
                <div className="w-full bg-black/30 rounded-lg h-2 overflow-hidden">
                  <div className="w-[94.3%] h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg" />
                </div>
              </div>
            </div>
            </HeroCard>
          </motion.div>
    </PageLayout>
  );
};

export default PerformancePage;