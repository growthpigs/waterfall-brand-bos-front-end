'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  MessageSquare,
  FileText,
  Activity,
  Users,
  Calendar,
  Target,
} from 'lucide-react';
import ProfessionalLayout from '../shared/ProfessionalLayout';
import ProfessionalSidebarNavigation from '../professional/ProfessionalSidebarNavigation';
interface DashboardCardProps {
  title: string;
  number: string | number;
  subtitle: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  delay?: number;
}
interface ContentProject {
  title: string;
  status: string;
  timeline: string;
  statusColor: string;
}
interface ContentTemplate {
  name: string;
  type: string;
}
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  number,
  subtitle,
  icon: Icon,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="glass-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-purple-700/40 backdrop-blur-sm rounded-xl">
          <Icon className="w-6 h-6 text-purple-200" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold text-white">{number}</div>
        <h3 className="text-lg font-semibold text-white/90">{title}</h3>
        <p className="text-sm text-white/70 leading-relaxed">{subtitle}</p>
      </div>
    </motion.div>
  );
};
const ContentCreationHub: React.FC = () => {
  const activeProjects: ContentProject[] = [
    {
      title: 'AI Productivity Blog Series',
      status: 'In Progress',
      timeline: 'Tomorrow',
      statusColor: 'bg-blue-500',
    },
    {
      title: 'LinkedIn Thought Leadership',
      status: 'Review',
      timeline: 'Today',
      statusColor: 'bg-orange-500',
    },
    {
      title: 'Customer Success Stories',
      status: 'Draft',
      timeline: 'Next Week',
      statusColor: 'bg-green-500',
    },
  ];
  const contentTemplates: ContentTemplate[] = [
    {
      name: 'Blog Post',
      type: 'Long-form',
    },
    {
      name: 'Social Media',
      type: 'Short-form',
    },
    {
      name: 'Email Campaign',
      type: 'Newsletter',
    },
    {
      name: 'Case Study',
      type: 'Authority',
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="glass-card"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">Content Creation Hub</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Projects */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white/90 mb-3">Active Projects</h4>
          <div className="space-y-3">
            {activeProjects.map((project, index) => (
              <div key={index} className="glass-small">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-white text-sm">{project.title}</h5>
                  <div className={`w-2 h-2 rounded-full ${project.statusColor}`} />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">{project.status}</span>
                  <span className="text-white/60">{project.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Templates */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white/90 mb-3">Content Templates</h4>
          <div className="grid grid-cols-2 gap-3">
            {contentTemplates.map((template, index) => (
              <div key={index} className="glass-small text-center">
                <h5 className="font-medium text-white text-sm mb-1">{template.name}</h5>
                <p className="text-xs text-white/60">{template.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
const IntelligenceDashboard: React.FC = () => {
  const metrics = [
    {
      label: 'Content Performance',
      value: '94%',
      trend: '+12%',
    },
    {
      label: 'Engagement Rate',
      value: '8.7%',
      trend: '+24%',
    },
    {
      label: 'Authority Score',
      value: '87',
      trend: '+5%',
    },
    {
      label: 'System Health',
      value: '99.9%',
      trend: 'Stable',
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="glass-card"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">Intelligence Dashboard</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="glass-small">
            <div
              className="text-2xl font-bold text-white mb-1"
              style={{
                fontSize: '1.25rem',
                lineHeight: '1.5',
              }}
            >
              {metric.value}
            </div>
            <div className="text-sm text-white/70 mb-2">{metric.label}</div>
            <div className="text-xs text-green-400 font-medium">{metric.trend}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/70">Last updated</span>
          <span className="text-white/90">2 minutes ago</span>
        </div>
      </div>
    </motion.div>
  );
};
interface BrandBOSDashboardProps {
  onNavigate?: (pageId: string) => void;
}

const BrandBOSDashboard: React.FC<BrandBOSDashboardProps> = ({ onNavigate }) => {
  return (
    <ProfessionalLayout
      theme="blue"
      sidebar={<ProfessionalSidebarNavigation onNavigate={onNavigate} activePageId="dashboard" />}
    >
      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-h-screen">
        <div className="flex-1 pl-4 pr-4 md:pl-0 md:pr-6 lg:pr-8 pt-6 sm:pt-8 pb-6 sm:pb-8 overflow-auto">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-0">
            {/* Header */}
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="mb-12"
            >
              <h1
                className="text-4xl font-bold text-white mb-3 drop-shadow-lg leading-tight text-left"
                style={{ maxWidth: '60%', lineHeight: '1.15' }}
              >
                Brand BOS Dashboard
              </h1>
              <p
                className="text-xl text-white/80 font-light drop-shadow-sm text-left"
                style={{ fontSize: '22px', maxWidth: '60%' }}
              >
                Transform intelligence into high-converting content
              </p>
            </motion.div>

            {/* Top Row - 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard
                title="Latest CIA Intelligence"
                number={12}
                subtitle="Fresh insights from your latest analysis"
                icon={Brain}
                delay={0.1}
              />
              <DashboardCard
                title="Viral Opportunities"
                number={8}
                subtitle="Trending topics ready for content creation"
                icon={TrendingUp}
                delay={0.2}
              />
              <DashboardCard
                title="Brand Voice Guidelines"
                number={5}
                subtitle="Your brand personality and messaging framework"
                icon={MessageSquare}
                delay={0.3}
              />
            </div>

            {/* Bottom Row - 2 Wider Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ContentCreationHub />
              <IntelligenceDashboard />
            </div>
          </div>
        </div>
      </main>
    </ProfessionalLayout>
  );
};
export default BrandBOSDashboard;
