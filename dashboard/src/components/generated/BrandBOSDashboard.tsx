import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, TrendingUp, CheckCircle, Target } from 'lucide-react';
import TopNavigation from './SidebarNavigation';
import TickerTape from './TickerTape';
import FloatingChatBar from './FloatingChatBar';
import QuickActions from './QuickActions';

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
      className="bg-black/15 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-purple-500/30 shadow-2xl hover:bg-black/20 hover:border-orange-500/40 hover:shadow-purple-500/20 transition-all duration-300 group"
      style={{
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.12), 0 4px 6px -4px rgb(0 0 0 / 0.12)"
      }}
    >
      <div className="flex items-start justify-between mb-3 lg:mb-4">
        <div className="p-2 lg:p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-400/20 group-hover:border-orange-400/30 group-hover:shadow-lg group-hover:shadow-purple-400/10 transition-all duration-300">
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
      className="bg-black/15 backdrop-blur-lg rounded-2xl p-4 lg:p-6 border border-purple-500/30 shadow-2xl hover:bg-black/20 hover:border-orange-500/40 hover:shadow-purple-500/20 transition-all duration-300 group"
      style={{
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.12), 0 4px 6px -4px rgb(0 0 0 / 0.12)"
      }}
    >
      <div className="flex items-start justify-between mb-4 lg:mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 lg:p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-400/20 group-hover:border-orange-400/30 group-hover:shadow-lg group-hover:shadow-purple-400/10 transition-all duration-300">
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
                className="bg-black/20 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-purple-400/20 hover:border-orange-400/30 hover:bg-black/25 hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-white/95 text-xs lg:text-sm">{cluster.title}</h5>
                  <div className={`w-2 h-2 rounded-full ${cluster.statusColor} shadow-lg`} />
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
                className="bg-black/20 backdrop-blur-sm rounded-xl p-3 lg:p-4 border border-purple-400/20 hover:border-orange-400/30 hover:bg-black/25 hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-300 text-center"
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
  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // Handle message sending logic here
  };

  return (
    <div className="min-h-screen w-full">
      {/* Purple gradient background with fire accents */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 -z-10" />
      <div className="fixed inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/10 -z-10" />
      
      {/* Top Navigation */}
      <TopNavigation />
      
      {/* Main Content - starts below navigation */}
      <div className="pt-20 px-4 lg:px-6 py-6 lg:py-8 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            className="mb-4 lg:mb-6 text-center lg:text-left"
            style={{
              marginBottom: "30px",
              marginTop: "40px"
            }}
          >
            <h1
              className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white/95 mb-2 lg:mb-4 drop-shadow-lg"
              style={{
                fontSize: "2rem",
                marginBottom: "0px",
                marginTop: "0px",
                paddingTop: "8px"
              }}
            >
              Brand BOS Command Center
            </h1>
            <p
              className="text-lg lg:text-xl text-white/85 font-light drop-shadow-sm"
              style={{
                display: "none"
              }}
            >
              AI-powered content intelligence and marketing automation
            </p>
          </motion.div>

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
        </div>
      </div>

      {/* Floating Chat Bar - positioned above interface */}
      <div className="fixed bottom-20 left-0 right-0 z-50 px-4 lg:px-6">
        <FloatingChatBar
          onSendMessage={handleSendMessage}
          placeholder="Ask about your Brand BOS performance..."
        />
      </div>

      {/* Ticker Tape at bottom */}
      <TickerTape />
    </div>
  );
};

export default BrandBOSDashboard; 