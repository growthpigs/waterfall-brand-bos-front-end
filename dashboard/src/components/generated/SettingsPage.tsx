'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  AlertTriangle,
  Circle,
  Settings as SettingsIcon,
  Clock,
  Users,
  Bell,
  CreditCard,
  Download,
  Upload,
  Key,
  Globe,
  Calendar,
  DollarSign,
  RefreshCw,
  Trash2,
  Plus,
  X,
  Save,
  TestTube,
  Shield,
  Zap,
  TrendingUp,
} from 'lucide-react';
import ProfessionalLayout from '../shared/ProfessionalLayout';
import ProfessionalSidebarNavigation from '../professional/ProfessionalSidebarNavigation';
import PersistentChatBar from './PersistentChatBar';
interface IntegrationStatus {
  id: string;
  name: string;
  status: 'connected' | 'warning' | 'disconnected';
  description?: string;
}
interface ContentFormat {
  id: string;
  label: string;
  enabled: boolean;
}
interface NotificationSetting {
  id: string;
  label: string;
  enabled: boolean;
}
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}
interface SettingsPageProps {
  onNavigate?: (pageId: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  // Integration Status Section
  const [integrations] = useState<IntegrationStatus[]>([
    {
      id: 'ghl-mcp',
      name: 'GHL MCP',
      status: 'connected',
      description: 'Publishing to Facebook, Instagram, TikTok',
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      status: 'connected',
      description: 'Property: company-website.com',
    },
    {
      id: 'search-console',
      name: 'Search Console',
      status: 'connected',
      description: 'Verified domain',
    },
  ]);
  const [systemApis] = useState([
    {
      name: 'Notion Publishing',
      status: 'Active',
    },
    {
      name: 'Keyword Research',
      status: 'Active',
    },
    {
      name: 'Trend Analysis',
      status: 'Active',
    },
  ]);

  // Content Configuration Section
  const [contentFormats, setContentFormats] = useState<ContentFormat[]>([
    {
      id: 'blog-posts',
      label: 'Blog Posts',
      enabled: true,
    },
    {
      id: 'social-media',
      label: 'Social Media',
      enabled: true,
    },
    {
      id: 'email-campaigns',
      label: 'Email Campaigns',
      enabled: true,
    },
    {
      id: 'whitepapers',
      label: 'Whitepapers',
      enabled: false,
    },
    {
      id: 'newsletters',
      label: 'Newsletters',
      enabled: true,
    },
    {
      id: 'landing-pages',
      label: 'Landing Pages',
      enabled: false,
    },
    {
      id: 'podcast-outlines',
      label: 'Podcast Outlines',
      enabled: false,
    },
    {
      id: 'webinars',
      label: 'Webinars',
      enabled: true,
    },
    {
      id: 'advertisements',
      label: 'Advertisements',
      enabled: true,
    },
    {
      id: 'case-studies',
      label: 'Case Studies',
      enabled: false,
    },
    {
      id: 'product-descriptions',
      label: 'Product Descriptions',
      enabled: true,
    },
    {
      id: 'video-scripts',
      label: 'Video Scripts',
      enabled: false,
    },
    {
      id: 'infographics',
      label: 'Infographics',
      enabled: false,
    },
    {
      id: 'ebooks',
      label: 'Ebooks',
      enabled: false,
    },
  ]);
  const [publishingSchedule, setPublishingSchedule] = useState('Daily');
  const [brandVoice, setBrandVoice] = useState('Professional');
  const [autoApproval, setAutoApproval] = useState(false);

  // Notification Preferences Section
  const [slackChannel, setSlackChannel] = useState('#marketing');
  const [emailAlerts, setEmailAlerts] = useState<NotificationSetting[]>([
    {
      id: 'content-ready',
      label: 'Content Ready',
      enabled: true,
    },
    {
      id: 'publishing-complete',
      label: 'Publishing Complete',
      enabled: true,
    },
    {
      id: 'performance-alerts',
      label: 'Performance Alerts',
      enabled: false,
    },
    {
      id: 'system-updates',
      label: 'System Updates',
      enabled: true,
    },
  ]);
  const [ciaAnalysis, setCiaAnalysis] = useState({
    weeklyTrends: true,
    monthlySeo: true,
  });

  // Account Management Section
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'Admin',
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@company.com',
      role: 'Editor',
    },
    {
      id: '3',
      name: 'Lisa Rodriguez',
      email: 'lisa@company.com',
      role: 'Viewer',
    },
  ]);

  // System Preferences Section
  const [timezone, setTimezone] = useState('America/New_York');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [currency, setCurrency] = useState('USD');
  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
  };
  const getStatusIcon = (status: IntegrationStatus['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'disconnected':
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };
  const getStatusColor = (status: IntegrationStatus['status']) => {
    switch (status) {
      case 'connected':
        return 'border-green-400/30 bg-green-400/10';
      case 'warning':
        return 'border-yellow-400/30 bg-yellow-400/10';
      case 'disconnected':
        return 'border-gray-400/30 bg-gray-400/10';
    }
  };
  const toggleContentFormat = (id: string) => {
    setContentFormats(prev =>
      prev.map(format =>
        format.id === id
          ? {
              ...format,
              enabled: !format.enabled,
            }
          : format
      )
    );
  };
  const toggleEmailAlert = (id: string) => {
    setEmailAlerts(prev =>
      prev.map(alert =>
        alert.id === id
          ? {
              ...alert,
              enabled: !alert.enabled,
            }
          : alert
      )
    );
  };
  const testSlackConnection = () => {
    console.log('Testing Slack connection...');
  };
  return (
    <ProfessionalLayout
      theme="blue"
      sidebar={<ProfessionalSidebarNavigation onNavigate={onNavigate} activePageId="settings" />}
    >
      <main className="flex-1 flex flex-col relative min-h-screen">
        <div className="flex-1 pl-0 pr-8 pt-8 overflow-auto">
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
            className="max-w-7xl mx-auto"
          >
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg flex items-center">
                <SettingsIcon className="w-8 h-8 mr-3" />
                Brand BOS Settings
              </h1>
              <p className="text-white/70">Manage your Brand BOS configuration and preferences</p>
            </header>

            {/* Integration Status Section */}
            <motion.section
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Integration Status
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {integrations.map(integration => (
                  <motion.div
                    key={integration.id}
                    whileHover={{
                      scale: 1.02,
                    }}
                    className={`p-4 rounded-xl border ${getStatusColor(integration.status)} backdrop-blur-sm`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{integration.name}</span>
                      {getStatusIcon(integration.status)}
                    </div>
                    {integration.description && (
                      <p className="text-sm text-white/60">{integration.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  System APIs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {systemApis.map(api => (
                    <div key={api.name} className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">{api.name}</span>
                      <span className="text-green-400 text-sm font-medium">{api.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Content Configuration Section */}
              <motion.section
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <SettingsIcon className="w-5 h-5 mr-2" />
                  Content Configuration
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-3">
                      Content Formats
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {contentFormats.map(format => (
                        <label
                          key={format.id}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={format.enabled}
                            onChange={() => toggleContentFormat(format.id)}
                            className="rounded border-white/30 bg-white/10 text-slate-500 focus:ring-slate-500 focus:ring-offset-0"
                          />
                          <span className="text-sm text-white/80">{format.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Publishing Schedule
                    </label>
                    <select
                      value={publishingSchedule}
                      onChange={e => setPublishingSchedule(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekdays Only">Weekdays Only</option>
                      <option value="Custom Schedule">Custom Schedule</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Brand Voice
                    </label>
                    <select
                      value={brandVoice}
                      onChange={e => setBrandVoice(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    >
                      <option value="Professional">Professional</option>
                      <option value="Casual">Casual</option>
                      <option value="Technical">Technical</option>
                      <option value="Friendly">Friendly</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-white/80">Auto-Approval</span>
                      <div
                        className={`w-10 h-6 rounded-full transition-colors ${autoApproval ? 'bg-slate-500' : 'bg-white/20'}`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${autoApproval ? 'translate-x-5' : 'translate-x-1'} mt-1`}
                        />
                      </div>
                    </label>
                    <p className="text-xs text-white/50 mt-1">Skip human review for social posts</p>
                  </div>
                </div>
              </motion.section>

              {/* Notification Preferences Section */}
              <motion.section
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.3,
                }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Preferences
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Slack Channel
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={slackChannel}
                        onChange={e => setSlackChannel(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        placeholder="#channel-name"
                      />
                      <button
                        onClick={testSlackConnection}
                        className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors flex items-center"
                      >
                        <TestTube className="w-4 h-4 mr-1" />
                        Test
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-3">
                      Email Alerts
                    </label>
                    <div className="space-y-2">
                      {emailAlerts.map(alert => (
                        <label
                          key={alert.id}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <span className="text-white/80">{alert.label}</span>
                          <div
                            className={`w-10 h-6 rounded-full transition-colors ${alert.enabled ? 'bg-slate-500' : 'bg-white/20'}`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${alert.enabled ? 'translate-x-5' : 'translate-x-1'} mt-1`}
                            />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-3">
                      CIA Analysis
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-white/80">Weekly trend notifications</span>
                        <div
                          className={`w-10 h-6 rounded-full transition-colors ${ciaAnalysis.weeklyTrends ? 'bg-slate-500' : 'bg-white/20'}`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${ciaAnalysis.weeklyTrends ? 'translate-x-5' : 'translate-x-1'} mt-1`}
                          />
                        </div>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-white/80">Monthly SEO updates</span>
                        <div
                          className={`w-10 h-6 rounded-full transition-colors ${ciaAnalysis.monthlySeo ? 'bg-slate-500' : 'bg-white/20'}`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${ciaAnalysis.monthlySeo ? 'translate-x-5' : 'translate-x-1'} mt-1`}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Account Management Section */}
              <motion.section
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.4,
                }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Account Management
                </h2>

                <div className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Pro Plan</span>
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                    <div className="text-white/60 text-sm space-y-1">
                      <div>Content Generation: 8,450 / 10,000</div>
                      <div>API Calls: 2,340 / 5,000</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-3">
                      Team Members
                    </label>
                    <div className="space-y-2">
                      {teamMembers.map(member => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2"
                        >
                          <div>
                            <div className="text-white/80 text-sm font-medium">{member.name}</div>
                            <div className="text-white/50 text-xs">{member.email}</div>
                          </div>
                          <span className="text-xs bg-white/20 px-2 py-1 rounded text-white/80">
                            {member.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors flex items-center justify-center">
                      <Download className="w-4 h-4 mr-2" />
                      Download CIA Archives
                    </button>
                    <button className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors flex items-center justify-center">
                      <Upload className="w-4 h-4 mr-2" />
                      Export Content Library
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* System Preferences Section */}
              <motion.section
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.5,
                }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  System Preferences
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Timezone</label>
                    <select
                      value={timezone}
                      onChange={e => setTimezone(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Date Format
                    </label>
                    <select
                      value={dateFormat}
                      onChange={e => setDateFormat(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Currency</label>
                    <select
                      value={currency}
                      onChange={e => setCurrency(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (C$)</option>
                    </select>
                  </div>

                  <button className="w-full px-4 py-2 bg-gradient-to-r from-slate-400 to-slate-600 hover:from-slate-500 hover:to-slate-700 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center shadow-lg shadow-slate-500/20">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </motion.section>
            </div>

            {/* Chat Bar */}
            <div className="mt-8 pb-8">
              <PersistentChatBar onSendMessage={handleSendMessage} />
            </div>
          </motion.div>
        </div>
      </main>
    </ProfessionalLayout>
  );
};
export default SettingsPage;
