import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Target, BarChart3, Users, TrendingUp, Award } from 'lucide-react';
import TopNavigation from './SidebarNavigation';
import TickerTape from './TickerTape';
import FloatingChatBar from './FloatingChatBar';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-black/15 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 shadow-2xl hover:bg-black/20 hover:border-orange-500/40 hover:shadow-purple-500/20 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-400/20 group-hover:border-orange-400/30 group-hover:shadow-lg group-hover:shadow-purple-400/10 transition-all duration-300">
          <Icon className="w-6 h-6 text-white/95" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {change}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-white/95">{value}</div>
        <h3 className="text-lg font-semibold text-white/90">{title}</h3>
      </div>
    </motion.div>
  );
};

const AIInsightsPanel: React.FC = () => {
  const insights = [
    { category: 'Content Performance', insight: 'Long-form authority content driving 3x more engagement', confidence: 92 },
    { category: 'Audience Behavior', insight: 'Peak engagement Tuesday 10-11 AM EST', confidence: 88 },
    { category: 'Topic Trends', insight: 'AI and automation topics trending up 45% this month', confidence: 95 },
    { category: 'Conversion Patterns', insight: 'Case study content converting 2.3x better than standard posts', confidence: 91 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-black/15 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 shadow-2xl hover:bg-black/20 hover:border-orange-500/40 hover:shadow-purple-500/20 transition-all duration-300"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-400/20">
          <Sparkles className="w-6 h-6 text-white/95" />
        </div>
        <h3 className="text-xl font-semibold text-white/95">AI-Powered Insights</h3>
      </div>
      
      <div className="space-y-4">
        {insights.map((item, index) => (
          <div key={index} className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20 hover:border-orange-400/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-white/90">{item.category}</h4>
              <span className="text-xs text-orange-400 font-medium">{item.confidence}% confidence</span>
            </div>
            <p className="text-sm text-white/75">{item.insight}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const StrategyRecommendations: React.FC = () => {
  const recommendations = [
    { action: 'Increase LinkedIn publishing frequency', impact: 'High', effort: 'Low' },
    { action: 'Launch email nurture sequence for dormant leads', impact: 'High', effort: 'Medium' },
    { action: 'Create video content from top-performing articles', impact: 'Medium', effort: 'High' },
    { action: 'Optimize content distribution timing', impact: 'Medium', effort: 'Low' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="bg-black/15 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 shadow-2xl hover:bg-black/20 hover:border-orange-500/40 hover:shadow-purple-500/20 transition-all duration-300"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-400/20">
          <Target className="w-6 h-6 text-white/95" />
        </div>
        <h3 className="text-xl font-semibold text-white/95">Strategy Recommendations</h3>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={index} className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20 hover:border-orange-400/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-white/90 flex-1">{rec.action}</h4>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-lg ${rec.impact === 'High' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {rec.impact} Impact
                </span>
                <span className={`text-xs px-2 py-1 rounded-lg ${rec.effort === 'Low' ? 'bg-blue-500/20 text-blue-400' : rec.effort === 'Medium' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'}`}>
                  {rec.effort} Effort
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const CIAPage: React.FC = () => {
  const handleSendMessage = (message: string) => {
    console.log('CIA message sent:', message);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Purple gradient background with fire accents */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 -z-10" />
      <div className="fixed inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-red-500/10 -z-10" />
      
      {/* Top Navigation */}
      <TopNavigation />
      
      {/* Main Content */}
      <div className="pt-20 px-4 lg:px-6 py-6 lg:py-8 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-400/20">
                <Brain className="w-8 h-8 text-white/95" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white/95 drop-shadow-lg">
                Content Intelligence Accelerator
              </h1>
            </div>
            <p className="text-lg text-white/85">
              AI-powered insights and recommendations to optimize your content strategy
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Content ROI"
              value="312%"
              change="+24%"
              icon={TrendingUp}
              delay={0.1}
            />
            <MetricCard
              title="Engagement Rate"
              value="8.7%"
              change="+1.2%"
              icon={Users}
              delay={0.2}
            />
            <MetricCard
              title="Authority Score"
              value="9.2/10"
              change="+0.8"
              icon={Award}
              delay={0.3}
            />
            <MetricCard
              title="AI Predictions"
              value="94%"
              change="Accuracy"
              icon={Zap}
              delay={0.4}
            />
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AIInsightsPanel />
            <StrategyRecommendations />
          </div>

          {/* Performance Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 bg-black/15 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 shadow-2xl"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-400/20">
                <BarChart3 className="w-6 h-6 text-white/95" />
              </div>
              <h3 className="text-xl font-semibold text-white/95">Performance Trends</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20">
                <h4 className="font-medium text-white/90 mb-2">Content Velocity</h4>
                <div className="text-2xl font-bold text-white/95 mb-1">+45%</div>
                <p className="text-sm text-white/75">Publishing speed increased</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20">
                <h4 className="font-medium text-white/90 mb-2">Lead Quality</h4>
                <div className="text-2xl font-bold text-white/95 mb-1">87/100</div>
                <p className="text-sm text-white/75">Average lead score</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20">
                <h4 className="font-medium text-white/90 mb-2">Conversion Rate</h4>
                <div className="text-2xl font-bold text-white/95 mb-1">12.4%</div>
                <p className="text-sm text-white/75">Content to customer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Chat Bar */}
      <div className="fixed bottom-20 left-0 right-0 z-50 px-4 lg:px-6">
        <FloatingChatBar
          onSendMessage={handleSendMessage}
          placeholder="Ask CIA for content insights..."
        />
      </div>

      {/* Ticker Tape */}
      <TickerTape />
    </div>
  );
};

export default CIAPage;