import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Calendar, Users, TrendingUp, Play, Pause, CheckCircle, AlertCircle } from 'lucide-react';
import PageLayout from '../shared/PageLayout';
import PageHeader from '../shared/PageHeader';
import { perfectCardShadow, glassCardStyles } from '../../lib/utils';

interface CampaignCardProps {
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  progress: number;
  startDate: string;
  endDate: string;
  leads: number;
  engagement: string;
  delay?: number;
}

const getStatusIcon = (status: CampaignCardProps['status']) => {
  switch (status) {
    case 'active':
      return <Play className="w-4 h-4" />;
    case 'paused':
      return <Pause className="w-4 h-4" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4" />;
    case 'draft':
      return <AlertCircle className="w-4 h-4" />;
  }
};

const getStatusColor = (status: CampaignCardProps['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-500/20 text-green-400 border-green-400/30';
    case 'paused':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
    case 'completed':
      return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
    case 'draft':
      return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
  }
};

const CampaignCard: React.FC<CampaignCardProps> = ({
  name,
  status,
  progress,
  startDate,
  endDate,
  leads,
  engagement,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`${glassCardStyles} p-6 border border-purple-500/30 hover:bg-black/20 hover:border-orange-500/40 transition-all duration-300`}
      style={{ boxShadow: perfectCardShadow }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white/95">{name}</h3>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-lg border ${getStatusColor(status)}`}>
          {getStatusIcon(status)}
          <span className="text-sm font-medium capitalize">{status}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-white/75 mb-2">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-black/30 rounded-lg h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: delay + 0.3 }}
            className="h-full bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg"
          />
        </div>
      </div>

      {/* Campaign Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-purple-400/20">
          <div className="flex items-center space-x-2 mb-1">
            <Calendar className="w-4 h-4 text-white/75" />
            <span className="text-xs text-white/75">Duration</span>
          </div>
          <p className="text-sm font-medium text-white/90">{startDate} - {endDate}</p>
        </div>
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-purple-400/20">
          <div className="flex items-center space-x-2 mb-1">
            <Users className="w-4 h-4 text-white/75" />
            <span className="text-xs text-white/75">Leads Generated</span>
          </div>
          <p className="text-sm font-medium text-white/90">{leads.toLocaleString()}</p>
        </div>
      </div>

      {/* Engagement Metric */}
      <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-purple-400/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-white/75" />
            <span className="text-sm text-white/75">Engagement Rate</span>
          </div>
          <span className="text-sm font-medium text-white/90">{engagement}</span>
        </div>
      </div>
    </motion.div>
  );
};

const CampaignMetrics: React.FC = () => {
  const metrics = [
    { label: 'Active Campaigns', value: '12', change: '+3 this month' },
    { label: 'Total Reach', value: '248K', change: '+15% growth' },
    { label: 'Conversion Rate', value: '8.4%', change: '+1.2% vs last month' },
    { label: 'ROI', value: '342%', change: '+28% improvement' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={glassCardStyles + ' p-6 border border-purple-500/30 hover:bg-black/20 hover:border-orange-500/40 transition-all duration-300'}
      style={{ boxShadow: perfectCardShadow }}
        >
          <h3 className="text-sm font-medium text-white/75 mb-2">{metric.label}</h3>
          <div className="text-3xl font-bold text-white/95 mb-1">{metric.value}</div>
          <p className="text-xs text-orange-400">{metric.change}</p>
        </motion.div>
      ))}
    </div>
  );
};

const CampaignCenterPage: React.FC = () => {
  console.log('[Campaign] rendered successfully');
  
  const campaigns: CampaignCardProps[] = [
    {
      name: "Q4 Authority Building Series",
      status: "active",
      progress: 68,
      startDate: "Oct 1",
      endDate: "Dec 31",
      leads: 342,
      engagement: "12.4%"
    },
    {
      name: "LinkedIn Thought Leadership",
      status: "active",
      progress: 45,
      startDate: "Nov 15",
      endDate: "Jan 15",
      leads: 128,
      engagement: "9.2%"
    },
    {
      name: "Email Nurture Sequence",
      status: "paused",
      progress: 30,
      startDate: "Nov 1",
      endDate: "Dec 15",
      leads: 87,
      engagement: "24.6%"
    },
    {
      name: "Holiday Content Blitz",
      status: "completed",
      progress: 100,
      startDate: "Dec 1",
      endDate: "Dec 25",
      leads: 523,
      engagement: "18.7%"
    },
    {
      name: "New Year Authority Launch",
      status: "draft",
      progress: 0,
      startDate: "Jan 1",
      endDate: "Feb 28",
      leads: 0,
      engagement: "0%"
    },
    {
      name: "Case Study Showcase",
      status: "active",
      progress: 82,
      startDate: "Dec 10",
      endDate: "Jan 10",
      leads: 256,
      engagement: "15.3%"
    }
  ];


  return (
    <PageLayout pageTitle="Campaign Center" placeholder="Ask about campaign management...">
      {/* Pink gradient background with fire accents */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-600 via-pink-700 to-pink-800 -z-10" />
      <div className="fixed inset-0 bg-gradient-to-tr from-rose-500/20 via-transparent to-pink-500/10 -z-10" />
          {/* Header - Global Standard */}
          <PageHeader 
            title="Campaign Center"
            subtitle="Launch and manage multi-channel authority building campaigns"
          />

          {/* Campaign Metrics */}
          <CampaignMetrics />

          {/* Campaign Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {campaigns.map((campaign, index) => (
              <CampaignCard
                key={index}
                {...campaign}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={'mt-8 ' + glassCardStyles + ' p-6 border border-purple-500/30'}
      style={{ boxShadow: perfectCardShadow }}
          >
            <h3 className="text-xl font-semibold text-white/95 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20 hover:border-orange-400/30 hover:bg-black/25 transition-all duration-300 text-center">
                <Rocket className="w-6 h-6 text-white/95 mx-auto mb-2" />
                <span className="text-sm font-medium text-white/90">Launch Campaign</span>
              </button>
              <button className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20 hover:border-orange-400/30 hover:bg-black/25 transition-all duration-300 text-center">
                <Calendar className="w-6 h-6 text-white/95 mx-auto mb-2" />
                <span className="text-sm font-medium text-white/90">Schedule Content</span>
              </button>
              <button className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20 hover:border-orange-400/30 hover:bg-black/25 transition-all duration-300 text-center">
                <Users className="w-6 h-6 text-white/95 mx-auto mb-2" />
                <span className="text-sm font-medium text-white/90">Import Leads</span>
              </button>
              <button className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20 hover:border-orange-400/30 hover:bg-black/25 transition-all duration-300 text-center">
                <TrendingUp className="w-6 h-6 text-white/95 mx-auto mb-2" />
                <span className="text-sm font-medium text-white/90">View Analytics</span>
              </button>
            </div>
          </motion.div>
    </PageLayout>
  );
};

export default CampaignCenterPage;