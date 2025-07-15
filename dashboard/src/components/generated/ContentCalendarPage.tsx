'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  Edit3,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
  MessageSquare,
  Send,
  X,
  Minimize2,
  Maximize2,
  BarChart3,
  Target,
  Zap,
  Settings,
  ArrowRight,
  TrendingUp,
  Users,
  Eye,
  Brain,
  Layers,
  Sparkles,
} from 'lucide-react';
import ProfessionalLayout from '../shared/ProfessionalLayout';
import ProfessionalSidebarNavigation from '../professional/ProfessionalSidebarNavigation';
interface ContentCard {
  id: string;
  platform: 'instagram' | 'twitter' | 'linkedin' | 'facebook' | 'youtube';
  content: string;
  time: string;
  status: 'published' | 'scheduled' | 'draft';
  type: 'post' | 'story' | 'reel' | 'video';
  engagement?: number;
  cluster?: string;
  clusterColor?: string;
}
interface TimeSlot {
  hour: number;
  label: string;
  ciaTiming?: string;
}
interface DayColumn {
  date: string;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  content: ContentCard[];
}
const timeSlots: TimeSlot[] = [
  {
    hour: 6,
    label: '6 AM',
    ciaTiming: 'Early Authority',
  },
  {
    hour: 7,
    label: '7 AM',
    ciaTiming: 'Peak Engagement',
  },
  {
    hour: 8,
    label: '8 AM',
    ciaTiming: 'Professional Prime',
  },
  {
    hour: 9,
    label: '9 AM',
    ciaTiming: 'Authority Window',
  },
  {
    hour: 10,
    label: '10 AM',
    ciaTiming: 'Decision Makers',
  },
  {
    hour: 11,
    label: '11 AM',
    ciaTiming: 'Mid-Morning Peak',
  },
  {
    hour: 12,
    label: '12 PM',
    ciaTiming: 'Lunch Engagement',
  },
  {
    hour: 13,
    label: '1 PM',
    ciaTiming: 'Afternoon Authority',
  },
  {
    hour: 14,
    label: '2 PM',
    ciaTiming: 'Peak Performance',
  },
  {
    hour: 15,
    label: '3 PM',
    ciaTiming: 'Customer Focus',
  },
  {
    hour: 16,
    label: '4 PM',
    ciaTiming: 'Industry Insights',
  },
  {
    hour: 17,
    label: '5 PM',
    ciaTiming: 'End-Day Authority',
  },
  {
    hour: 18,
    label: '6 PM',
    ciaTiming: 'Evening Engagement',
  },
  {
    hour: 19,
    label: '7 PM',
    ciaTiming: 'Prime Time',
  },
  {
    hour: 20,
    label: '8 PM',
    ciaTiming: 'Thought Leadership',
  },
  {
    hour: 21,
    label: '9 PM',
    ciaTiming: 'Community Building',
  },
  {
    hour: 22,
    label: '10 PM',
    ciaTiming: 'Late Engagement',
  },
  {
    hour: 23,
    label: '11 PM',
    ciaTiming: 'Night Authority',
  },
];
const sampleContent: ContentCard[] = [
  {
    id: '1',
    platform: 'instagram',
    content: 'Customer Success Authority',
    time: '9:00',
    status: 'published',
    type: 'post',
    engagement: 85,
    cluster: 'Customer Success Stories',
    clusterColor: 'emerald',
  },
  {
    id: '2',
    platform: 'twitter',
    content: 'Product Expertise Thread',
    time: '14:30',
    status: 'scheduled',
    type: 'post',
    cluster: 'Product Authority',
    clusterColor: 'blue',
  },
  {
    id: '3',
    platform: 'linkedin',
    content: 'Industry Insights Post',
    time: '16:00',
    status: 'draft',
    type: 'post',
    cluster: 'Industry Leadership',
    clusterColor: 'purple',
  },
  {
    id: '4',
    platform: 'youtube',
    content: 'CEO Thought Leadership',
    time: '19:00',
    status: 'scheduled',
    type: 'video',
    cluster: 'Executive Authority',
    clusterColor: 'orange',
  },
];
const generateWeekData = (): DayColumn[] => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  return Array.from(
    {
      length: 7,
    },
    (_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', {
          weekday: 'short',
        }),
        dayNumber: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
        content: index < 4 ? sampleContent.slice(0, Math.floor(Math.random() * 3) + 1) : [],
      };
    }
  );
};
interface ContentCalendarPageProps {
  onNavigate?: (pageId: string) => void;
}

const ContentCalendarPage: React.FC<ContentCalendarPageProps> = ({ onNavigate }) => {
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('week');
  const [weekData] = useState<DayColumn[]>(generateWeekData());
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMinimized, setChatMinimized] = useState(false);
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return Instagram;
      case 'twitter':
        return Twitter;
      case 'linkedin':
        return Linkedin;
      case 'facebook':
        return Facebook;
      case 'youtube':
        return Youtube;
      default:
        return MessageSquare;
    }
  };
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'from-pink-500 to-purple-500';
      case 'twitter':
        return 'from-black to-gray-800';
      case 'linkedin':
        return 'from-blue-600 to-blue-700';
      case 'facebook':
        return 'from-blue-500 to-blue-600';
      case 'youtube':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };
  const getClusterColor = (clusterColor?: string) => {
    switch (clusterColor) {
      case 'emerald':
        return 'border-emerald-400/50 bg-emerald-500/20';
      case 'blue':
        return 'border-blue-400/50 bg-blue-500/20';
      case 'purple':
        return 'border-purple-400/50 bg-purple-500/20';
      case 'orange':
        return 'border-orange-400/50 bg-orange-500/20';
      default:
        return 'border-cyan-400/50 bg-cyan-500/20';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-3 h-3 text-green-400" />;
      case 'scheduled':
        return <Clock className="w-3 h-3 text-yellow-400" />;
      case 'draft':
        return <Edit3 className="w-3 h-3 text-gray-400" />;
      default:
        return null;
    }
  };
  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };
  return (
    <ProfessionalLayout
      theme="blue"
      sidebar={<ProfessionalSidebarNavigation onNavigate={onNavigate} activePageId="calendar" />}
    >
      {/* Main Content Area */}
      {/* Fixed Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800" />

      {/* Main Content */}
      <div
        className="flex-1 pl-0 pr-8 pt-8 overflow-auto pr-96"
        style={{
          width: '1500px',
          maxWidth: '1500px',
        }}
      >
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
          className="max-w-7xl pb-8"
          style={{
            width: '1400px',
            maxWidth: '1400px',
          }}
        >
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg flex items-center">
              <Calendar className="w-8 h-8 mr-3" />
              Content Calendar
            </h1>
            <p className="text-white/80 text-lg">
              Strategic content clusters with CIA-powered audience intelligence
            </p>
          </div>

          {/* Weekly Cluster Overview Card */}
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
              delay: 0.05,
            }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Layers className="w-5 h-5 mr-2" />
                  Week 12 Content Cluster
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-medium">
                    Customer Success Stories
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="text-white/80 text-sm font-medium flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Cluster Progress
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Completion</span>
                      <span className="text-white font-medium">8/12 pieces live</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-emerald-400 h-2 rounded-full"
                        style={{
                          width: '67%',
                        }}
                      ></div>
                    </div>
                    <div className="text-emerald-300 text-xs">4 pieces remaining this week</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-white/80 text-sm font-medium flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Authority Building
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Weekly Score</span>
                      <span className="text-cyan-300 font-medium">89%</span>
                    </div>
                    <div className="text-white/60 text-xs">
                      Customer journey alignment: Excellent
                    </div>
                    <div className="text-white/60 text-xs">Cross-platform coordination: Active</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-white/80 text-sm font-medium flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Next Cluster
                  </h3>
                  <div className="space-y-2">
                    <div className="px-3 py-2 bg-purple-500/20 border border-purple-400/30 rounded-lg">
                      <div className="text-purple-300 text-sm font-medium">Product Innovation</div>
                      <div className="text-white/60 text-xs">Generation starts: Tomorrow</div>
                    </div>
                    <div className="text-white/60 text-xs">12 pieces planned • 4 platforms</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Calendar Controls */}
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
              delay: 0.1,
            }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-white/10 rounded-lg p-1">
                    {['Month', 'Week', 'Day'].map(view => (
                      <button
                        key={view}
                        onClick={() =>
                          setCurrentView(view.toLowerCase() as 'month' | 'week' | 'day')
                        }
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentView === view.toLowerCase() ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`}
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-white font-medium px-4">December 2024</span>
                    <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-white/70 text-sm">
                    <span className="font-medium text-white">24</span> posts this week
                  </div>
                  <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors">
                    Generate Cluster
                  </button>
                </div>
              </div>

              {/* Weekly Stats with CIA Context */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-1">Authority Sequence</div>
                  <div className="text-2xl font-bold text-white">24</div>
                  <div className="text-cyan-300 text-xs flex items-center mt-1">
                    <Brain className="w-3 h-3 mr-1" />
                    CIA-optimized order
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-1">Cluster Completion</div>
                  <div className="text-2xl font-bold text-yellow-400">8/12</div>
                  <div className="text-white/60 text-xs mt-1">Customer Success theme</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-1">Journey Alignment</div>
                  <div className="text-2xl font-bold text-green-400">89%</div>
                  <div className="text-white/60 text-xs mt-1">Funnel progression</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white/70 text-sm mb-1">Peak Timing</div>
                  <div className="text-2xl font-bold text-cyan-400">9AM</div>
                  <div className="text-cyan-300 text-xs flex items-center mt-1">
                    <Target className="w-3 h-3 mr-1" />
                    Best audience engagement
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Calendar Grid */}
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
              delay: 0.2,
            }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
              <div className="grid grid-cols-8 gap-4">
                {/* Time Column */}
                <div className="space-y-4">
                  <div className="h-12 flex items-center justify-center">
                    <span className="text-white/70 text-sm font-medium">CIA Timing</span>
                  </div>
                  {timeSlots.map(slot => (
                    <div key={slot.hour} className="h-16 flex flex-col items-center justify-center">
                      <span className="text-white/60 text-xs">{slot.label}</span>
                      <span className="text-cyan-300 text-xs font-medium">{slot.ciaTiming}</span>
                    </div>
                  ))}
                </div>

                {/* Day Columns */}
                {weekData.map((day, dayIndex) => (
                  <div key={day.date} className="space-y-4">
                    {/* Day Header */}
                    <div
                      className={`h-12 flex flex-col items-center justify-center rounded-lg ${day.isToday ? 'bg-cyan-500/30 border border-cyan-400/50' : 'bg-white/5'}`}
                    >
                      <span className="text-white text-sm font-medium">{day.dayName}</span>
                      <span
                        className={`text-xs ${day.isToday ? 'text-cyan-200' : 'text-white/60'}`}
                      >
                        {day.dayNumber}
                      </span>
                    </div>

                    {/* Time Slots */}
                    {timeSlots.map(slot => {
                      const contentForSlot = day.content.find(
                        c => parseInt(c.time.split(':')[0]) === slot.hour
                      );
                      return (
                        <div
                          key={`${day.date}-${slot.hour}`}
                          className="h-16 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors relative"
                        >
                          {contentForSlot && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                scale: 0.9,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              className={`absolute inset-1 bg-gradient-to-r ${getPlatformColor(contentForSlot.platform)} rounded-md p-2 cursor-pointer border ${getClusterColor(contentForSlot.clusterColor)}`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                {React.createElement(getPlatformIcon(contentForSlot.platform), {
                                  className: 'w-3 h-3 text-white',
                                })}
                                {getStatusIcon(contentForSlot.status)}
                              </div>
                              <div className="text-white text-xs font-medium truncate">
                                {contentForSlot.content}
                              </div>
                              <div className="text-white/70 text-xs flex items-center justify-between">
                                <span>{contentForSlot.time}</span>
                                {contentForSlot.cluster && (
                                  <span className="text-xs bg-white/20 px-1 rounded">
                                    {contentForSlot.cluster.split(' ')[0]}
                                  </span>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Section: Pipeline & Analytics */}
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
              delay: 0.3,
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Publishing Pipeline with Cluster Context */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <ArrowRight className="w-5 h-5 mr-2" />
                Content Cluster Pipeline
              </h3>

              <div className="space-y-4">
                {[
                  {
                    stage: 'Cluster Generation',
                    count: 5,
                    color: 'blue',
                    cluster: 'Product Innovation',
                  },
                  {
                    stage: 'Authority Review',
                    count: 3,
                    color: 'yellow',
                    cluster: 'Customer Success',
                  },
                  {
                    stage: 'Journey Aligned',
                    count: 8,
                    color: 'green',
                    cluster: 'Customer Success',
                  },
                  {
                    stage: 'CIA Scheduled',
                    count: 12,
                    color: 'cyan',
                    cluster: 'Customer Success',
                  },
                  {
                    stage: 'Live Authority',
                    count: 24,
                    color: 'pink',
                    cluster: 'Customer Success',
                  },
                ].map((item, index) => (
                  <div
                    key={item.stage}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${item.color === 'blue' ? 'bg-blue-400' : item.color === 'yellow' ? 'bg-yellow-400' : item.color === 'green' ? 'bg-green-400' : item.color === 'cyan' ? 'bg-cyan-400' : 'bg-pink-400'}`}
                      />
                      <div>
                        <span className="text-white font-medium">{item.stage}</span>
                        <div className="text-white/60 text-xs">{item.cluster} cluster</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white/70">{item.count}</span>
                      {index < 4 && <ArrowRight className="w-4 h-4 text-white/40" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-lg">
                <div className="flex items-center text-emerald-400 text-sm font-medium mb-1">
                  <Layers className="w-4 h-4 mr-2" />
                  Next Cluster Generation: Tomorrow
                </div>
                <div className="text-white/70 text-xs">
                  Product Innovation • 12 pieces • 4 platforms
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-3">
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm">
                  Auto-Schedule Cluster
                </button>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm">
                  Cluster Analytics
                </button>
              </div>
            </div>

            {/* Platform Analytics with CIA Intelligence */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                CIA Audience Intelligence
              </h3>

              <div className="space-y-4">
                {[
                  {
                    platform: 'Instagram',
                    optimal: '9:00 AM',
                    engagement: '89%',
                    icon: Instagram,
                    color: 'from-pink-500 to-purple-500',
                    intelligence: 'Authority building sequence',
                  },
                  {
                    platform: 'LinkedIn',
                    optimal: '8:00 AM',
                    engagement: '76%',
                    icon: Linkedin,
                    color: 'from-blue-600 to-blue-700',
                    intelligence: 'Decision maker window',
                  },
                  {
                    platform: 'Twitter',
                    optimal: '2:30 PM',
                    engagement: '82%',
                    icon: Twitter,
                    color: 'from-black to-gray-800',
                    intelligence: 'Customer journey peak',
                  },
                  {
                    platform: 'YouTube',
                    optimal: '7:00 PM',
                    engagement: '91%',
                    icon: Youtube,
                    color: 'from-red-500 to-red-600',
                    intelligence: 'Thought leadership prime',
                  },
                ].map(platform => (
                  <div
                    key={platform.platform}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center mr-3`}
                      >
                        {React.createElement(platform.icon, {
                          className: 'w-4 h-4 text-white',
                        })}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{platform.platform}</div>
                        <div className="text-cyan-300 text-xs">{platform.intelligence}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium text-sm">{platform.engagement}</div>
                      <div className="text-white/60 text-xs">Best: {platform.optimal}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-cyan-500/20 border border-cyan-400/30 rounded-lg">
                <div className="flex items-center text-cyan-400 text-sm font-medium mb-1">
                  <Brain className="w-4 h-4 mr-2" />
                  CIA Analysis Active
                </div>
                <div className="text-white/70 text-xs">
                  Real-time audience intelligence • Authority optimization enabled
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Fixed Right Chat Widget */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        {!chatOpen ? (
          <motion.button
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 bg-gradient-to-r from-[#06B6D4] to-[#0F766E] rounded-full flex items-center justify-center text-white shadow-2xl"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl ${chatMinimized ? 'w-80 h-12' : 'w-80 h-96'} transition-all duration-300`}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h4 className="text-white font-semibold flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Cluster Assistant
              </h4>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setChatMinimized(!chatMinimized)}
                  className="p-1 text-white/70 hover:text-white transition-colors"
                >
                  {chatMinimized ? (
                    <Maximize2 className="w-4 h-4" />
                  ) : (
                    <Minimize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setChatOpen(false)}
                  className="p-1 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!chatMinimized && (
              <>
                {/* Chat Messages */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto h-64">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-white/80 text-sm">
                      <strong>Cluster Assistant:</strong> I can help you optimize content clusters,
                      analyze authority building sequences, or suggest CIA-powered timing
                      strategies. What would you like to know about your content clusters?
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-white/20">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={e => setChatMessage(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about content clusters..."
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </ProfessionalLayout>
  );
};
export default ContentCalendarPage;
