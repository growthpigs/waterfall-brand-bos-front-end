import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, FileText, Video, Mail, Hash, Sparkles, Zap, RefreshCw, Settings } from 'lucide-react';
import HeroCard from '../shared/HeroCard';
import PageLayout from '../shared/PageLayout';
import PageHeader from '../shared/PageHeader';
import { perfectCardShadow, glassCardStyles } from '../../lib/utils';

interface ContentTemplate {
  id: string;
  name: string;
  type: 'article' | 'video' | 'social' | 'email';
  description: string;
  estimatedTime: string;
  aiPowered: boolean;
}

interface GenerationSettings {
  tone: 'professional' | 'conversational' | 'educational' | 'inspirational';
  length: 'short' | 'medium' | 'long';
  targetAudience: string;
  includeKeywords: string[];
}

const getTemplateIcon = (type: ContentTemplate['type']) => {
  switch (type) {
    case 'article':
      return <FileText className="w-6 h-6" />;
    case 'video':
      return <Video className="w-6 h-6" />;
    case 'social':
      return <Hash className="w-6 h-6" />;
    case 'email':
      return <Mail className="w-6 h-6" />;
  }
};

const ContentTemplateCard: React.FC<{
  template: ContentTemplate;
  onSelect: () => void;
  delay?: number;
}> = ({ template, onSelect, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onClick={onSelect}
      className={`${glassCardStyles} p-6 border border-green-500/30 hover:bg-black/20 hover:border-emerald-500/40 transition-all duration-300 cursor-pointer group`}
      style={{ boxShadow: perfectCardShadow }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-green-400/20 group-hover:border-emerald-400/30 transition-all duration-300">
          {getTemplateIcon(template.type)}
        </div>
        {template.aiPowered && (
          <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/20 rounded-lg">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400 font-medium">AI-Powered</span>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-white/95 mb-2">{template.name}</h3>
      <p className="text-sm text-white/75 mb-3">{template.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/60">Est. {template.estimatedTime}</span>
        <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
          Use Template →
        </button>
      </div>
    </motion.div>
  );
};

const GenerationPanel: React.FC<{
  selectedTemplate: ContentTemplate | null;
  onClose: () => void;
}> = ({ selectedTemplate, onClose }) => {
  const [settings, setSettings] = useState<GenerationSettings>({
    tone: 'professional',
    length: 'medium',
    targetAudience: 'Financial advisors and business leaders',
    includeKeywords: ['authority', 'expertise', 'trust']
  });

  const [keywords, setKeywords] = useState('authority, expertise, trust');

  if (!selectedTemplate) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="relative bg-green-900/90 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full border border-green-500/30"
        style={{ boxShadow: perfectCardShadow }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white/90 transition-colors text-2xl"
        >
          ×
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-green-400/20">
            {getTemplateIcon(selectedTemplate.type)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white/95">{selectedTemplate.name}</h2>
            <p className="text-white/75">Configure your content generation settings</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Tone Selection */}
          <div>
            <label className="block text-sm font-medium text-white/75 mb-3">Content Tone</label>
            <div className="grid grid-cols-2 gap-3">
              {(['professional', 'conversational', 'educational', 'inspirational'] as const).map(tone => (
                <button
                  key={tone}
                  onClick={() => setSettings(prev => ({ ...prev, tone }))}
                  className={`
                    px-4 py-3 rounded-xl border capitalize transition-all duration-300
                    ${settings.tone === tone 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-transparent' 
                      : 'bg-black/20 backdrop-blur-sm border-green-400/20 text-white/75 hover:border-emerald-400/30'
                    }
                  `}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Length Selection */}
          <div>
            <label className="block text-sm font-medium text-white/75 mb-3">Content Length</label>
            <div className="grid grid-cols-3 gap-3">
              {(['short', 'medium', 'long'] as const).map(length => (
                <button
                  key={length}
                  onClick={() => setSettings(prev => ({ ...prev, length }))}
                  className={`
                    px-4 py-3 rounded-xl border capitalize transition-all duration-300
                    ${settings.length === length 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-transparent' 
                      : 'bg-black/20 backdrop-blur-sm border-green-400/20 text-white/75 hover:border-emerald-400/30'
                    }
                  `}
                >
                  {length}
                </button>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-white/75 mb-2">Target Audience</label>
            <input
              type="text"
              value={settings.targetAudience}
              onChange={(e) => setSettings(prev => ({ ...prev, targetAudience: e.target.value }))}
              className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-green-400/20 text-white/90 placeholder-white/50 focus:border-emerald-400/40 focus:outline-none transition-all duration-300"
              placeholder="Describe your target audience..."
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-white/75 mb-2">Include Keywords</label>
            <textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-green-400/20 text-white/90 placeholder-white/50 focus:border-emerald-400/40 focus:outline-none transition-all duration-300 h-20 resize-none"
              placeholder="Enter keywords separated by commas..."
            />
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Zap className="w-5 h-5" />
            <span>Generate Content</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-black/20 backdrop-blur-sm rounded-xl border border-green-400/20 text-white/75 hover:border-emerald-400/30 hover:bg-black/25 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ContentEnginePage: React.FC = () => {
  console.log('[ContentEngine] rendered successfully');
  
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);


  const templates: ContentTemplate[] = [
    {
      id: '1',
      name: 'Authority Article Builder',
      type: 'article',
      description: 'Create in-depth articles that establish your expertise and thought leadership',
      estimatedTime: '15 min',
      aiPowered: true
    },
    {
      id: '2',
      name: 'Video Script Generator',
      type: 'video',
      description: 'Generate compelling video scripts for YouTube, webinars, and social media',
      estimatedTime: '10 min',
      aiPowered: true
    },
    {
      id: '3',
      name: 'Social Media Series',
      type: 'social',
      description: 'Create cohesive social media campaigns across LinkedIn, Twitter, and Facebook',
      estimatedTime: '5 min',
      aiPowered: true
    },
    {
      id: '4',
      name: 'Email Nurture Sequence',
      type: 'email',
      description: 'Build automated email sequences that convert leads into clients',
      estimatedTime: '20 min',
      aiPowered: true
    },
    {
      id: '5',
      name: 'Case Study Creator',
      type: 'article',
      description: 'Transform client success stories into powerful case studies',
      estimatedTime: '25 min',
      aiPowered: false
    },
    {
      id: '6',
      name: 'LinkedIn Pulse Article',
      type: 'article',
      description: "Craft articles optimized for LinkedIn's professional audience",
      estimatedTime: '12 min',
      aiPowered: true
    }
  ];

  const recentGenerations = [
    { title: 'Q4 Market Analysis Report', type: 'article', date: '2 hours ago', status: 'published' },
    { title: 'Client Success Story: Tech Startup', type: 'video', date: '5 hours ago', status: 'editing' },
    { title: 'December Newsletter Campaign', type: 'email', date: '1 day ago', status: 'scheduled' },
    { title: 'Year-End Authority Summary', type: 'article', date: '2 days ago', status: 'draft' }
  ];

  return (
    <PageLayout pageTitle="Content Engine" placeholder="Ask Content Engine to create something...">
      {/* Green gradient background with emerald accents */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 -z-10" />
      <div className="fixed inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-green-500/10 -z-10" />
          {/* Header - Global Standard */}
          <PageHeader 
            title="Content Engine"
            subtitle="AI-powered content generation for authority building at scale"
          />

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <HeroCard>
                <div className="text-3xl font-bold text-white mb-1">2,847</div>
                <p className="text-sm text-white/75">Content pieces generated</p>
              </HeroCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HeroCard>
                <div className="text-3xl font-bold text-white mb-1">15 min</div>
                <p className="text-sm text-white/75">Average creation time</p>
              </HeroCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <HeroCard>
                <div className="text-3xl font-bold text-white mb-1">94%</div>
                <p className="text-sm text-white/75">AI accuracy rate</p>
              </HeroCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <HeroCard>
                <div className="text-3xl font-bold text-white mb-1">8.7/10</div>
                <p className="text-sm text-white/75">Content quality score</p>
              </HeroCard>
            </motion.div>
          </div>

          {/* Content Templates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-white/95 mb-6">Content Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <ContentTemplateCard
                  key={template.id}
                  template={template}
                  onSelect={() => setSelectedTemplate(template)}
                  delay={0.5 + index * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Recent Generations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <HeroCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white/95">Recent Generations</h3>
              <button className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">View All</span>
              </button>
            </div>

            <div className="space-y-3">
              {recentGenerations.map((item, index) => (
                <div
                  key={index}
                  className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-green-400/20 hover:border-emerald-400/30 transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    {getTemplateIcon(item.type as ContentTemplate['type'])}
                    <div>
                      <h4 className="font-medium text-white/90">{item.title}</h4>
                      <p className="text-sm text-white/60">{item.date}</p>
                    </div>
                  </div>
                  <span className={`
                    text-xs px-3 py-1 rounded-lg
                    ${item.status === 'published' ? 'bg-green-500/20 text-green-400' : 
                      item.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                      item.status === 'editing' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'}
                  `}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full bg-black/20 backdrop-blur-sm rounded-xl py-3 border border-green-400/20 text-white/75 hover:border-emerald-400/30 hover:bg-black/25 transition-all duration-300 flex items-center justify-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Advanced Settings</span>
            </button>
            </HeroCard>
          </motion.div>

      {/* Generation Panel */}
      {selectedTemplate && (
        <GenerationPanel
          selectedTemplate={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </PageLayout>
  );
};

export default ContentEnginePage;