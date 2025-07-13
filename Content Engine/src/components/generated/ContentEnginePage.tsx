"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, ChevronLeft, ChevronRight, Settings, Play, CheckCircle, Clock, AlertCircle, MessageSquare, Send, X, Minimize2, Maximize2, Instagram, Twitter, Linkedin, Facebook, Youtube, Mic, Mail, Video, BookOpen, Download, Target, Zap, BarChart3 } from 'lucide-react';
import SidebarNavigation from './SidebarNavigation';
interface ContentFormat {
  id: string;
  title: string;
  category: 'blog' | 'social' | 'audio-video';
  status: 'ready' | 'in-progress' | 'scheduled' | 'published';
  icon: React.ComponentType<{
    className?: string;
  }>;
  enabled: boolean;
  description: string;
}
interface ContentEnginePageProps {
  selectedCluster?: string;
  weekOffset?: number;
  enabledFormats?: string[];
  onFormatToggle?: (formatId: string, enabled: boolean) => void;
  onPublishContent?: (contentId: string, platform: string) => void;
  onClusterChange?: (clusterId: string) => void;
}
const contentFormats: ContentFormat[] = [
// Blog Content (Blue)
{
  id: 'ai-search-blog',
  title: 'AI Search Blog',
  category: 'blog',
  status: 'ready',
  icon: Target,
  enabled: true,
  description: 'SEO-optimized long-form content'
}, {
  id: 'epic-pillar',
  title: 'Epic Pillar',
  category: 'blog',
  status: 'in-progress',
  icon: BookOpen,
  enabled: true,
  description: 'Comprehensive authority piece'
}, {
  id: 'supporting-posts',
  title: 'Supporting Posts',
  category: 'blog',
  status: 'scheduled',
  icon: FileText,
  enabled: true,
  description: '3-5 supporting articles'
}, {
  id: 'advertorial',
  title: 'Advertorial',
  category: 'blog',
  status: 'ready',
  icon: Zap,
  enabled: false,
  description: 'Promotional content piece'
},
// Social Content (Green)
{
  id: 'instagram',
  title: 'Instagram',
  category: 'social',
  status: 'ready',
  icon: Instagram,
  enabled: true,
  description: 'Stories & feed posts'
}, {
  id: 'twitter',
  title: 'X/Twitter',
  category: 'social',
  status: 'published',
  icon: Twitter,
  enabled: true,
  description: 'Thread & single posts'
}, {
  id: 'linkedin',
  title: 'LinkedIn',
  category: 'social',
  status: 'in-progress',
  icon: Linkedin,
  enabled: true,
  description: 'Professional content'
}, {
  id: 'facebook',
  title: 'Facebook',
  category: 'social',
  status: 'scheduled',
  icon: Facebook,
  enabled: false,
  description: 'Community posts'
}, {
  id: 'tiktok',
  title: 'TikTok',
  category: 'social',
  status: 'ready',
  icon: Video,
  enabled: true,
  description: 'Short-form videos'
}, {
  id: 'youtube-shorts',
  title: 'YouTube Shorts',
  category: 'social',
  status: 'ready',
  icon: Youtube,
  enabled: true,
  description: 'Vertical video content'
},
// Audio/Video Content (Orange)
{
  id: 'pillar-podcast',
  title: 'Pillar Podcast',
  category: 'audio-video',
  status: 'in-progress',
  icon: Mic,
  enabled: true,
  description: 'Long-form audio content'
}, {
  id: 'email-series',
  title: 'Email Series',
  category: 'audio-video',
  status: 'ready',
  icon: Mail,
  enabled: true,
  description: '5-part email sequence'
}, {
  id: 'webinar',
  title: 'Webinar',
  category: 'audio-video',
  status: 'scheduled',
  icon: Video,
  enabled: false,
  description: 'Live presentation'
}, {
  id: 'case-study',
  title: 'Case Study',
  category: 'audio-video',
  status: 'ready',
  icon: BarChart3,
  enabled: true,
  description: 'Success story analysis'
}, {
  id: 'lead-magnet',
  title: 'Lead Magnet',
  category: 'audio-video',
  status: 'published',
  icon: Download,
  enabled: true,
  description: 'Free resource offer'
}];
const ContentEnginePage: React.FC<ContentEnginePageProps> = ({
  selectedCluster = "AI Productivity Hacks",
  weekOffset = 0,
  enabledFormats = [],
  onFormatToggle,
  onPublishContent,
  onClusterChange
}) => {
  const [currentWeek, setCurrentWeek] = useState(weekOffset);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMinimized, setChatMinimized] = useState(false);
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'blog':
        return 'blue';
      case 'social':
        return 'green';
      case 'audio-video':
        return 'orange';
      default:
        return 'gray';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'scheduled':
        return <Calendar className="w-4 h-4 text-blue-400" />;
      case 'published':
        return <CheckCircle className="w-4 h-4 text-purple-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready':
        return 'Ready ✅';
      case 'in-progress':
        return 'In Progress 🟡';
      case 'scheduled':
        return 'Scheduled 📅';
      case 'published':
        return 'Published 🔴';
      default:
        return 'Unknown';
    }
  };
  const handleFormatToggle = (formatId: string, enabled: boolean) => {
    onFormatToggle?.(formatId, enabled);
  };
  const handlePublishContent = (contentId: string, platform: string) => {
    onPublishContent?.(contentId, platform);
  };
  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };
  return <div className="min-h-screen w-full flex bg-gradient-to-br from-green-600 via-green-700 to-emerald-800">
      {/* Green gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 -z-10" />
      
      {/* Left Sidebar */}
      <SidebarNavigation />
      
      {/* Professional Services 24px Standard Gap */}
      <div className="flex-shrink-0" style={{ width: "24px" }} />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative min-h-screen">
        {/* Main Content */}
        <div className="flex-1 pl-4 pr-4 md:pl-0 md:pr-6 lg:pr-8 pt-6 sm:pt-8 pb-6 sm:pb-8 overflow-auto">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-0">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="pb-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg flex items-center">
                <FileText className="w-8 h-8 mr-3" />
                Content Engine
              </h1>
              <p className="text-white/80 text-lg">
                Transform viral opportunities into 14+ content formats across all platforms
              </p>
            </div>

            {/* Top Section: Content Cluster Overview */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                    <h2 className="text-xl font-bold text-white">
                      Content Cluster: {selectedCluster}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button onClick={() => setCurrentWeek(currentWeek - 1)} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-white font-medium px-4">
                      Week {currentWeek === 0 ? 'Current' : currentWeek > 0 ? `+${currentWeek}` : currentWeek}
                    </span>
                    <button onClick={() => setCurrentWeek(currentWeek + 1)} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Convergence Intelligence Header */}
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-400/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                        <span className="text-white font-semibold">Convergence Score: 94%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                        <span className="text-white/80 text-sm">Sources: Grok Trending + Reddit Marketing</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-purple-500/30 text-purple-200 text-xs rounded-full border border-purple-400/50">
                        CIA Intelligence
                      </span>
                      <span className="text-white/70 text-sm">Customer Pain Point Focus</span>
                    </div>
                  </div>
                  <div className="text-white/60 text-sm">
                    High viral opportunity detected through convergence analysis. Customer psychology integration active.
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-white/70 text-sm mb-1">Total Formats</div>
                    <div className="text-2xl font-bold text-white">15</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-white/70 text-sm mb-1">Ready to Publish</div>
                    <div className="text-2xl font-bold text-green-400">8</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-white/70 text-sm mb-1">In Progress</div>
                    <div className="text-2xl font-bold text-yellow-400">4</div>
                  </div>
                </div>

                {/* Weekly Cluster Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 rounded-lg transition-colors border border-emerald-400/30">
                      Generate Next Cluster
                    </button>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                      Cluster Performance History
                    </button>
                  </div>
                  <div className="text-white/60 text-sm">
                    Viral momentum: ↗️ Trending upward
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Grid: 4x4 Content Format Cards */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Content Format Grid
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {contentFormats.map(format => {
                  const Icon = format.icon;
                  const categoryColor = getCategoryColor(format.category);
                  return <motion.div key={format.id} whileHover={{
                    scale: 1.02
                  }} whileTap={{
                    scale: 0.98
                  }} className={`relative p-4 rounded-xl border transition-all cursor-pointer ${format.enabled ? `bg-${categoryColor}-500/20 border-${categoryColor}-400/50 hover:bg-${categoryColor}-500/30` : 'bg-white/5 border-white/20 hover:bg-white/10'}`}>
                        {/* Category Color Indicator */}
                        <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${categoryColor === 'blue' ? 'bg-blue-400' : categoryColor === 'green' ? 'bg-green-400' : categoryColor === 'orange' ? 'bg-orange-400' : 'bg-gray-400'}`} />
                        
                        {/* CIA Intelligence Badge */}
                        <div className="absolute top-2 left-2 flex items-center space-x-1">
                          <span className="px-1.5 py-0.5 bg-purple-500/30 text-purple-200 text-xs rounded border border-purple-400/50">
                            CIA
                          </span>
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full" title="High intelligence integration"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="mb-3 mt-6">
                          <div className="flex items-center mb-2">
                            <Icon className="w-5 h-5 text-white mr-2" />
                            <h4 className="text-white font-semibold text-sm">
                              {format.title}
                            </h4>
                          </div>
                          <p className="text-white/70 text-xs mb-3">
                            {format.description}
                          </p>
                          
                          {/* Intelligence Indicators */}
                          <div className="space-y-1 mb-3">
                            <div className="flex items-center justify-between">
                              <span className="text-white/60 text-xs">Authority Score:</span>
                              <span className="text-emerald-400 text-xs font-semibold">
                                {Math.floor(Math.random() * 30) + 70}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white/60 text-xs">Customer Psychology:</span>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                                <span className="text-green-400 text-xs">Aligned</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Status */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            {getStatusIcon(format.status)}
                            <span className="text-xs text-white/80 ml-1">
                              {getStatusText(format.status)}
                            </span>
                          </div>
                        </div>
                        
                        {/* Toggle Switch */}
                        <div className="flex items-center justify-between">
                          <button onClick={() => handleFormatToggle(format.id, !format.enabled)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${format.enabled ? 'bg-green-500' : 'bg-gray-600'}`}>
                            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${format.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                          </button>
                          
                          {format.status === 'ready' && format.enabled && <button onClick={() => handlePublishContent(format.id, format.title)} className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition-colors">
                              <Play className="w-3 h-3" />
                            </button>}
                        </div>
                      </motion.div>;
                })}
                </div>
              </div>
            </motion.div>

            {/* Bottom Controls: Publishing Pipeline */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Publishing Pipeline
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-400/30">
                    <h4 className="text-white font-semibold mb-2 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
                      Blog Content
                    </h4>
                    <div className="text-white/70 text-sm space-y-1">
                      <div>• 3 of 4 formats enabled</div>
                      <div>• 2 ready to publish</div>
                      <div>• 1 in progress</div>
                      <div className="pt-2 border-t border-blue-400/20">
                        <span className="text-blue-300 text-xs">Notion MCP: Connected ✓</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-500/20 rounded-lg p-4 border border-green-400/30">
                    <h4 className="text-white font-semibold mb-2 flex items-center">
                      <Instagram className="w-4 h-4 mr-2 text-green-400" />
                      Social Content
                    </h4>
                    <div className="text-white/70 text-sm space-y-1">
                      <div>• 4 of 6 formats enabled</div>
                      <div>• 3 ready to publish</div>
                      <div>• 1 published</div>
                      <div className="pt-2 border-t border-green-400/20">
                        <span className="text-green-300 text-xs">GHL MCP: Connected ✓</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-500/20 rounded-lg p-4 border border-orange-400/30">
                    <h4 className="text-white font-semibold mb-2 flex items-center">
                      <Mic className="w-4 h-4 mr-2 text-orange-400" />
                      Audio/Video
                    </h4>
                    <div className="text-white/70 text-sm space-y-1">
                      <div>• 3 of 5 formats enabled</div>
                      <div>• 2 ready to publish</div>
                      <div>• 1 scheduled</div>
                      <div className="pt-2 border-t border-orange-400/20">
                        <span className="text-orange-300 text-xs">Cross-Platform Timing: Optimized</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors">
                      Publish All Ready
                    </button>
                    <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
                      Schedule Batch
                    </button>
                    <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                      Export All
                    </button>
                  </div>
                  
                  <div className="text-white/70 text-sm">
                    Last updated: 2 minutes ago
                  </div>
                </div>
              </div>
            </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Fixed Right Chat Widget */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
          {!chatOpen ? <motion.button onClick={() => setChatOpen(true)} className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white shadow-2xl" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
              <MessageSquare className="w-6 h-6" />
            </motion.button> : <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl ${chatMinimized ? 'w-80 h-12' : 'w-80 h-96'} transition-all duration-300`}>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <h4 className="text-white font-semibold flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Content Assistant
                </h4>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setChatMinimized(!chatMinimized)} className="p-1 text-white/70 hover:text-white transition-colors">
                    {chatMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setChatOpen(false)} className="p-1 text-white/70 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!chatMinimized && <>
                  {/* Chat Messages */}
                  <div className="flex-1 p-4 space-y-3 overflow-y-auto h-64">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-white/80 text-sm">
                        <strong>Assistant:</strong> I can help you optimize your content formats, suggest publishing schedules, or answer questions about your content strategy. What would you like to know?
                      </div>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-white/20">
                    <div className="flex items-center space-x-2">
                      <input type="text" value={chatMessage} onChange={e => setChatMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Ask about content strategy..." className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                      <button onClick={handleSendMessage} className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>}
            </motion.div>}
        </div>
      </main>
    </div>;
};
export default ContentEnginePage;