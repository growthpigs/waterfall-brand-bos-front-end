'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Calendar,
  Rocket,
  BarChart3,
  Settings,
  Home,
  Target,
  Shield,
  Brain,
  TrendingUp,
  Zap,
  Users,
  Clock,
  Play,
  Edit3,
  Mail,
  Globe,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Plus,
} from 'lucide-react';
import ProfessionalLayout from '../shared/ProfessionalLayout';
import ProfessionalSidebarNavigation from '../professional/ProfessionalSidebarNavigation';
import PersistentChatBar from './PersistentChatBar';
interface IntelligenceCard {
  id: string;
  title: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  gradient: string;
  description: string;
  count?: number;
}
interface ProjectCard {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'in-progress' | 'review' | 'completed';
  progress: number;
  dueDate: string;
}
interface TemplateCard {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}
interface QuickAction {
  id: string;
  title: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  gradient: string;
  description: string;
}
interface ContentEngineWorkspaceProps {
  onNavigate?: (pageId: string) => void;
}

const ContentEngineWorkspace: React.FC<ContentEngineWorkspaceProps> = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const intelligenceCards: IntelligenceCard[] = [
    {
      id: 'cia-insights',
      title: 'Latest CIA Insights',
      icon: Shield,
      gradient: 'from-purple-500 to-purple-700',
      description: 'Fresh intelligence from your latest analysis',
      count: 12,
    },
    {
      id: 'viral-opportunities',
      title: 'Viral Opportunities',
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-600',
      description: 'Trending topics ready for content creation',
      count: 8,
    },
    {
      id: 'brand-voice',
      title: 'Brand Voice Guidelines',
      icon: Brain,
      gradient: 'from-blue-500 to-cyan-600',
      description: 'Your brand personality and messaging framework',
      count: 5,
    },
  ];
  const activeProjects: ProjectCard[] = [
    {
      id: 'blog-series',
      title: 'AI Productivity Blog Series',
      type: 'Blog Content',
      status: 'in-progress',
      progress: 65,
      dueDate: 'Tomorrow',
    },
    {
      id: 'linkedin-campaign',
      title: 'LinkedIn Thought Leadership',
      type: 'Social Campaign',
      status: 'review',
      progress: 90,
      dueDate: 'Today',
    },
    {
      id: 'email-sequence',
      title: 'Onboarding Email Sequence',
      type: 'Email Marketing',
      status: 'draft',
      progress: 25,
      dueDate: 'Next Week',
    },
  ];
  const contentTemplates: TemplateCard[] = [
    {
      id: 'blog-template',
      title: 'Authority Blog Post',
      category: 'Blog',
      description: 'Establish thought leadership with data-driven insights',
      icon: FileText,
    },
    {
      id: 'social-template',
      title: 'Viral Social Thread',
      category: 'Social',
      description: 'Multi-platform social media content series',
      icon: Users,
    },
    {
      id: 'email-template',
      title: 'Conversion Email',
      category: 'Email',
      description: 'High-converting email campaigns with CTAs',
      icon: Mail,
    },
    {
      id: 'landing-template',
      title: 'Landing Page Copy',
      category: 'Web',
      description: 'Persuasive landing page content that converts',
      icon: Globe,
    },
  ];
  const quickActions: QuickAction[] = [
    {
      id: 'generate-blog',
      title: 'Generate Blog Post',
      icon: Edit3,
      gradient: 'from-purple-500 to-pink-500',
      description: 'AI-powered blog content from your intelligence',
    },
    {
      id: 'create-social',
      title: 'Create Social Content',
      icon: Users,
      gradient: 'from-blue-500 to-purple-500',
      description: 'Multi-platform social media campaigns',
    },
    {
      id: 'draft-email',
      title: 'Draft Email Campaign',
      icon: Mail,
      gradient: 'from-green-500 to-blue-500',
      description: 'Personalized email sequences that convert',
    },
    {
      id: 'build-landing',
      title: 'Build Landing Page',
      icon: Globe,
      gradient: 'from-orange-500 to-red-500',
      description: 'High-converting landing page copy',
    },
  ];
  const handleSendMessage = (message: string) => {
    console.log('Content Engine message:', message);
  };
  const getStatusColor = (status: ProjectCard['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/20';
      case 'in-progress':
        return 'text-blue-400 bg-blue-400/20';
      case 'review':
        return 'text-yellow-400 bg-yellow-400/20';
      default:
        return 'text-white/60 bg-white/10';
    }
  };
  return (
    <ProfessionalLayout
      theme="blue"
      sidebar={
        <ProfessionalSidebarNavigation onNavigate={onNavigate} activePageId="content-engine" />
      }
    >
      <main className="flex-1 flex flex-col relative min-h-screen">
        {/* Professional Services 24px Standard Gap */}
        <div className="flex-shrink-0" style={{ width: '24px' }} />
        <div className="flex-1 pl-0 pr-8 pt-12 pb-8 overflow-auto">
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
            className="max-w-7xl mx-auto h-full flex flex-col"
          >
            {/* Header Section */}
            <div className="mb-8">
              <motion.h1
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                }}
                className="text-4xl font-bold text-white mb-3 drop-shadow-lg leading-tight"
              >
                Brand BOS Dashboard
              </motion.h1>
              <motion.p
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                }}
                className="text-xl text-white/90 drop-shadow-sm font-light"
              >
                Transform intelligence into high-converting content
              </motion.p>
            </div>

            {/* Intelligence Feed Section */}
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
                delay: 0.4,
              }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Intelligence Feed</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {intelligenceCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.id}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 * index,
                      }}
                      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        {card.count && (
                          <span className="text-2xl font-bold text-white">{card.count}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                      <p className="text-white/70 text-sm">{card.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Content Creation Hub Section */}
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
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Content Creation Hub</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Projects */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Active Projects</h3>
                    <button className="text-white/70 hover:text-white transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {activeProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1 * index,
                        }}
                        className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedProject(project.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{project.title}</h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                          >
                            {project.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm mb-3">{project.type}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div
                                className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${project.progress}%`,
                                }}
                              />
                            </div>
                          </div>
                          <span className="text-white/70 text-sm">{project.dueDate}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Content Templates */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Content Templates</h3>
                    <button className="text-white/70 hover:text-white transition-colors">
                      <Sparkles className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {contentTemplates.map((template, index) => {
                      const Icon = template.icon;
                      return (
                        <motion.div
                          key={template.id}
                          initial={{
                            opacity: 0,
                            scale: 0.9,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.4,
                            delay: 0.1 * index,
                          }}
                          className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <Icon className="w-6 h-6 text-purple-400" />
                            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                          </div>
                          <h4 className="font-medium text-white text-sm mb-1">{template.title}</h4>
                          <p className="text-white/60 text-xs mb-2">{template.category}</p>
                          <p className="text-white/70 text-xs">{template.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Section */}
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
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 * index,
                      }}
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className={`bg-gradient-to-r ${action.gradient} p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300`}
                    >
                      <Icon className="w-8 h-8 mb-3" />
                      <h3 className="font-semibold mb-2">{action.title}</h3>
                      <p className="text-white/90 text-sm">{action.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Ticker Tape */}
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
              className="mb-6"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl overflow-hidden">
                <motion.div
                  animate={{
                    x: [-1000, 1000],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="whitespace-nowrap text-white/80"
                >
                  ✍️ 47 pieces generated this week • 🎯 3 viral posts identified • 📈 Content ROI up
                  240% • 🚀 New template available • ✍️ 47 pieces generated this week • 🎯 3 viral
                  posts identified • 📈 Content ROI up 240% • 🚀 New template available
                </motion.div>
              </div>
            </motion.div>

            {/* Chat Interface */}
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
              className="mt-auto"
            >
              <div
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl"
                style={{
                  display: 'none',
                }}
              >
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-white/90 mb-1">
                    Content Strategy Assistant
                  </h3>
                  <p className="text-sm text-white/70">
                    Ask about content strategy, request specific content, or get writing help...
                  </p>
                </div>
                <PersistentChatBar
                  onSendMessage={handleSendMessage}
                  placeholder="Ask about content strategy, request specific content, or get writing help..."
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </ProfessionalLayout>
  );
};
export default ContentEngineWorkspace;
