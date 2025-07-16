import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, TrendingUp, CheckCircle, Target } from 'lucide-react';
import QuickActions from './QuickActions';
import { glassCardStyles, perfectCardShadow } from '../../lib/utils';
import PageLayout from '../shared/PageLayout';
import PageHeader from '../shared/PageHeader';

interface DashboardCardProps {
  title: string;
  number: string | number;
  subtitle: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  delay?: number;
}

interface ContentCluster {
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
  delay = 0
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.6,
        delay
      }}
      whileHover={{
        y: -2,
        transition: {
          duration: 0.2
        }
      }}
      className={`${glassCardStyles} p-4 lg:p-6 group`}
      style={{
        boxShadow: perfectCardShadow
      }}
    >
      <div className="flex items-start justify-between mb-3 lg:mb-4">
        <div className="p-2 lg:p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-400/20 group-hover:border-orange-400/30 transition-all duration-300">
          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white/95" />
        </div>
      </div>
      
      <div className="space-y-1 lg:space-y-2">
        <div className="text-2xl lg:text-3xl font-bold text-white/95">{number}</div>
        <h3 className="text-base lg:text-lg font-semibold text-white/90">{title}</h3>
        <p className="text-xs lg:text-sm text-white/75 leading-relaxed">{subtitle}</p>
      </div>
    </motion.div>
  );
};

const ContentOperationsHub: React.FC = () => {
  const activeClusters: ContentCluster[] = [
    {
      title: "Tech Industry Analysis",
      status: "In Progress",
      timeline: "This Week",
      statusColor: "bg-purple-500"
    },
    {
      title: "Healthcare Content Series",
      status: "Review",
      timeline: "Today",
      statusColor: "bg-orange-500"
    },
    {
      title: "Financial Services Campaign",
      status: "Planning",
      timeline: "Next Week",
      statusColor: "bg-blue-500"
    }
  ];

  const contentTemplates: ContentTemplate[] = [
    {
      name: "AI Search Blog",
      type: "SEO Content"
    },
    {
      name: "Epic Pillar Article",
      type: "Authority Content"
    },
    {
      name: "Social Campaign",
      type: "Social Media"
    },
    {
      name: "Email Sequence",
      type: "Email Marketing"
    }
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.6,
        delay: 0.3
      }}
      whileHover={{
        y: -2,
        transition: {
          duration: 0.2
        }
      }}
      className={`${glassCardStyles} p-4 lg:p-6 group`}
      style={{
        boxShadow: perfectCardShadow
      }}
    >
      <div className="flex items-start justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 lg:p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-400/20 group-hover:border-orange-400/30 transition-all duration-300">
            <Target className="w-5 h-5 lg:w-6 lg:h-6 text-white/95" />
          </div>
          <h3 className="text-lg lg:text-xl font-semibold text-white/95">Content Operations Hub</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Active Content Clusters */}
        <div className="space-y-3 lg:space-y-4">
          <h4 className="text-base lg:text-lg font-medium text-white/90 mb-3">Active Content Clusters</h4>
          <div className="space-y-2 lg:space-y-3">
            {activeClusters.map((cluster, index) => (
              <div
                key={index}
                className="bg-black/20 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-purple-400/20 hover:border-orange-400/30 hover:bg-black/25 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-white/95 text-xs lg:text-sm">{cluster.title}</h5>
                  <div className={`w-2 h-2 rounded-full ${cluster.statusColor}`} />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/75">{cluster.status}</span>
                  <span className="text-white/65">{cluster.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Templates */}
        <div className="space-y-3 lg:space-y-4">
          <h4 className="text-base lg:text-lg font-medium text-white/90 mb-3">Content Templates</h4>
          <div className="grid grid-cols-2 gap-2 lg:gap-3">
            {contentTemplates.map((template, index) => (
              <div
                key={index}
                className="bg-black/20 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-purple-400/20 hover:border-orange-400/30 hover:bg-black/25 transition-all duration-300 text-center"
              >
                <h5 className="font-medium text-white/95 text-xs lg:text-sm mb-1">{template.name}</h5>
                <p className="text-xs text-white/65">{template.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const BrandBOSDashboard: React.FC = () => {
  console.log('Dashboard loaded successfully');
  console.log('[Dashboard] rendered successfully');
  
  
  return (
    <PageLayout pageTitle="Brand BOS Command Center" placeholder="Ask about your Brand BOS performance...">
      {/* Header - Global Standard */}
      <PageHeader 
        title="Brand BOS Command Center"
        subtitle="AI-powered content intelligence and marketing automation"
      />

      {/* Top Row - 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <DashboardCard
          title="Active Clients"
          number={47}
          subtitle="Currently managed client accounts with active campaigns"
          icon={Users}
          delay={0.1}
        />
        <DashboardCard
          title="Content Generated"
          number="2,847"
          subtitle="Pieces created this month (+23% growth)"
          icon={FileText}
          delay={0.2}
        />
        <DashboardCard
          title="Authority Score"
          number="8.4/10"
          subtitle="Average brand authority improvement across clients"
          icon={TrendingUp}
          delay={0.3}
        />
        <DashboardCard
          title="Publishing Success"
          number="94%"
          subtitle="Content published on schedule this month"
          icon={CheckCircle}
          delay={0.4}
        />
      </div>

      {/* Bottom Row - 2 Wider Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
        <ContentOperationsHub />
        <QuickActions />
      </div>

    </PageLayout>
  );
};

export default BrandBOSDashboard; 