"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, Search, Play, Download, Send, ChevronDown, Clock, CheckCircle, AlertCircle, Zap, TrendingUp, Brain, Slack, Mail, Users } from 'lucide-react';
import SidebarNavigation from './SidebarNavigation';

interface OpportunityOption {
  id: string;
  score: number;
  title: string;
  description: string;
  selected?: boolean;
}

interface BrandIntelligencePageProps {
  onNavigate?: (pageId: string) => void;
}

const BrandIntelligencePage: React.FC<BrandIntelligencePageProps> = ({ onNavigate }) => {
  const [selectedUrl, setSelectedUrl] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('UAG Financial');
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null);
  const opportunities: OpportunityOption[] = [{
    id: 'option-a',
    score: 94,
    title: 'AI productivity hacks trending',
    description: 'ChatGPT workflow optimization viral on LinkedIn'
  }, {
    id: 'option-b',
    score: 87,
    title: 'Remote work burnout discussions',
    description: 'Hybrid work policies trending across platforms'
  }, {
    id: 'option-c',
    score: 82,
    title: 'LinkedIn algorithm changes',
    description: 'Platform update affecting business visibility'
  }];
  const handleAnalyzeNow = () => {
    console.log('Starting analysis for:', selectedUrl);
  };
  const handleSelectOpportunity = (opportunityId: string) => {
    setSelectedOpportunity(opportunityId);
  };
  return <div className="flex h-screen w-full overflow-hidden">
      
      {/* Left Sidebar */}
      <SidebarNavigation onNavigate={onNavigate} activePageId="intelligence" />
      
      {/* Main Content Area */}
      <main className="flex-1 flex relative min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
        {/* Main Content */}
        <div className="flex-1 px-8 pt-8 overflow-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="max-w-6xl pb-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg flex items-center">
                <Target className="w-8 h-8 mr-3" />
                Brand Intelligence
              </h1>
              <p className="text-white/80 text-lg">
                On-demand analysis, viral opportunities, and comprehensive market insights
              </p>
            </div>

            {/* Section 1: Quick Intelligence */}
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
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <h2 className="text-xl font-bold text-white flex items-center">
                    🎯 QUICK INTELLIGENCE
                    <span className="text-sm font-normal text-white/70 ml-2">(On-Demand Analysis)</span>
                  </h2>
                </div>

                {/* New Analysis Form */}
                <div className="bg-white/5 rounded-xl p-4 mb-6 border border-green-400/30">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-green-400" />
                    New Analysis
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div className="lg:col-span-2">
                      <label className="block text-white/80 text-sm mb-2">URL:</label>
                      <input type="url" value={selectedUrl} onChange={e => setSelectedUrl(e.target.value)} placeholder="https://example.com" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>
                    <div>
                      <button onClick={handleAnalyzeNow} className="w-full h-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center min-h-[42px]">
                        <Play className="w-4 h-4 mr-2" />
                        Analyze Now
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Company:</label>
                      <div className="relative">
                        <select value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none">
                          <option value="UAG Financial">UAG Financial</option>
                          <option value="TechCorp">TechCorp</option>
                          <option value="InnovateCo">InnovateCo</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Country:</label>
                      <div className="relative">
                        <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none">
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Analysis Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-white">
                      ⚡ Current Analysis: Phase 2A - Awaiting DataForSEO Keywords
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">
                      View Progress
                    </button>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">
                      Export Archives
                    </button>
                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors">
                      Send to Content Engine
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section 2: Weekly Intelligence */}
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
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                  <h2 className="text-xl font-bold text-white flex items-center">
                    📅 WEEKLY INTELLIGENCE
                    <span className="text-sm font-normal text-white/70 ml-2">(Viral Opportunity Detection)</span>
                  </h2>
                </div>

                {/* Opportunities Selection */}
                <div className="bg-white/5 rounded-xl p-4 mb-6 border border-blue-400/30">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
                    This Week's Opportunities (Choose by Tue 5PM)
                  </h3>
                  <div className="space-y-4">
                    {opportunities.map(opportunity => <div key={opportunity.id} className={`p-4 rounded-lg border transition-all ${selectedOpportunity === opportunity.id ? 'bg-blue-500/20 border-blue-400' : 'bg-white/5 border-white/20 hover:bg-white/10'}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="text-lg mr-2">
                                {opportunity.id === 'option-a' ? '🔥' : opportunity.id === 'option-b' ? '📈' : '💡'}
                              </span>
                              <span className="text-white font-semibold">
                                Option {opportunity.id.split('-')[1].toUpperCase()} (Score: {opportunity.score})
                              </span>
                              <span className="ml-2 text-white"> - {opportunity.title}</span>
                            </div>
                            <p className="text-white/70 text-sm ml-6">
                              "{opportunity.description}"
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button onClick={() => handleSelectOpportunity(opportunity.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedOpportunity === opportunity.id ? 'bg-blue-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                              {selectedOpportunity === opportunity.id ? 'Selected' : 'Select This'}
                            </button>
                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>

                {/* Status Footer */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-white/80 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      ⏰ Next Analysis: Monday 9:00 AM
                    </span>
                    <span className="text-yellow-400">
                      Auto-select in: 18h 23m
                    </span>
                  </div>
                  <span className="text-green-400 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    ✅ Last Week: Generated 14 content pieces from Option A
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Section 3: Monthly Deep Dive */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }} className="mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
                  <h2 className="text-xl font-bold text-white flex items-center">
                    🔍 MONTHLY DEEP DIVE
                    <span className="text-sm font-normal text-white/70 ml-2">(Comprehensive Market Analysis)</span>
                  </h2>
                </div>

                {/* Analysis Progress */}
                <div className="bg-white/5 rounded-xl p-4 mb-6 border border-orange-400/30">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <Search className="w-4 h-4 mr-2 text-orange-400" />
                    Complete Intelligence Refresh
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white flex items-center">
                        📊 Market Position Analysis
                      </span>
                      <span className="text-green-400 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        ✅ Complete (July 1)
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white flex items-center">
                        🏢 Competitor Intelligence
                      </span>
                      <span className="text-yellow-400 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        ⏳ In Progress (Phase 3)
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white flex items-center">
                        🎯 Authority Gap Assessment
                      </span>
                      <span className="text-blue-400 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        📅 Scheduled (July 15)
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white flex items-center">
                        📈 Performance Correlation
                      </span>
                      <span className="text-blue-400 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        📅 Scheduled (July 15)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm transition-colors">
                      View Full Report
                    </button>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      Download PDF
                    </button>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">
                      Schedule Review
                    </button>
                  </div>
                </div>

                {/* Status and Notifications */}
                <div className="flex items-center justify-between">
                  <div className="text-white/80 text-sm">
                    📋 Last Deep Dive: June 15 | Next Scheduled: July 15
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-white/80">🔔 Notifications:</span>
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center text-green-400">
                        <Slack className="w-4 h-4 mr-1" />
                        Slack ✅
                      </span>
                      <span className="flex items-center text-green-400">
                        <Mail className="w-4 h-4 mr-1" />
                        Email ✅
                      </span>
                      <span className="flex items-center text-red-400">
                        <Users className="w-4 h-4 mr-1" />
                        Teams ❌
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Intelligence Insights Panel */}
        <motion.div initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} className="w-80 p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 shadow-xl sticky top-8">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              Latest Intelligence
            </h3>
            
            <div className="space-y-4 text-sm">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-white font-medium mb-2">🧠 New Benson Points Discovered</div>
                <div className="text-white/70 space-y-1">
                  <div>• Pain Point: "Time management"</div>
                  <div>• False Solution: "More apps"</div>
                </div>
              </div>
              
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-white font-medium mb-2">🎯 Authority Opportunities</div>
                <div className="text-white/70 space-y-1">
                  <div>• LinkedIn: 47% engagement gap</div>
                  <div>• Podcast: Untapped medium</div>
                </div>
              </div>
              
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-white font-medium mb-2">⚡ Frank Kern Insights</div>
                <div className="text-white/70 space-y-1">
                  <div>• Story angle: Transformation</div>
                  <div>• Hook potential: High</div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm transition-colors">
              View All Insights
            </button>
          </div>
        </motion.div>
      </main>
    </div>;
};
export default BrandIntelligencePage;