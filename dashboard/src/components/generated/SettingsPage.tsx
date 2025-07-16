import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Palette, Database, Key, Globe, Mail, Smartphone } from 'lucide-react';
import TopNavigation from './SidebarNavigation';
import TickerTape from './TickerTape';
import FloatingChatBar from './FloatingChatBar';

interface SettingsSectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  delay?: number;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, icon: Icon, children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-black/15 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 shadow-2xl hover:bg-black/20 hover:border-orange-500/40 transition-all duration-300"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-400/20">
          <Icon className="w-6 h-6 text-white/95" />
        </div>
        <h3 className="text-xl font-semibold text-white/95">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
};

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: () => void }> = ({ enabled, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
        enabled ? 'bg-gradient-to-r from-purple-500 to-orange-500' : 'bg-black/30 border border-purple-400/20'
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg"
      />
    </button>
  );
};

const SettingsPage: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [autoPublish, setAutoPublish] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);

  const handleSendMessage = (message: string) => {
    console.log('Settings message sent:', message);
  };

  const themes = ['Purple Fire', 'Ocean Blue', 'Forest Green', 'Sunset Orange', 'Midnight Black'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Portuguese'];
  const timezones = ['EST', 'PST', 'CST', 'GMT', 'CET'];

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
                <Settings className="w-8 h-8 text-white/95" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white/95 drop-shadow-lg">
                Settings
              </h1>
            </div>
            <p className="text-lg text-white/85">
              Customize your Brand BOS experience and preferences
            </p>
          </motion.div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Settings */}
            <SettingsSection title="Profile Settings" icon={User} delay={0.1}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/75 mb-2">Display Name</label>
                  <input
                    type="text"
                    defaultValue="John Smith"
                    className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-purple-400/20 text-white/90 placeholder-white/50 focus:border-orange-400/40 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/75 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="john@agency.com"
                    className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-purple-400/20 text-white/90 placeholder-white/50 focus:border-orange-400/40 focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/75 mb-2">Company Name</label>
                  <input
                    type="text"
                    defaultValue="Elite Marketing Agency"
                    className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-purple-400/20 text-white/90 placeholder-white/50 focus:border-orange-400/40 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>
            </SettingsSection>

            {/* Notification Settings */}
            <SettingsSection title="Notifications" icon={Bell} delay={0.2}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-white/75" />
                    <div>
                      <p className="text-white/90 font-medium">Email Notifications</p>
                      <p className="text-sm text-white/60">Receive campaign updates via email</p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-white/75" />
                    <div>
                      <p className="text-white/90 font-medium">Push Notifications</p>
                      <p className="text-sm text-white/60">Get instant alerts on your device</p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-white/75" />
                    <div>
                      <p className="text-white/90 font-medium">Auto-Publish Content</p>
                      <p className="text-sm text-white/60">Automatically publish scheduled content</p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={autoPublish} onChange={() => setAutoPublish(!autoPublish)} />
                </div>
              </div>
            </SettingsSection>

            {/* Appearance Settings */}
            <SettingsSection title="Appearance" icon={Palette} delay={0.3}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/75 mb-2">Theme</label>
                  <select className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-purple-400/20 text-white/90 focus:border-orange-400/40 focus:outline-none transition-all duration-300">
                    {themes.map(theme => (
                      <option key={theme} value={theme} className="bg-purple-900">{theme}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/90 font-medium">Dark Mode</p>
                    <p className="text-sm text-white/60">Use dark theme across the platform</p>
                  </div>
                  <ToggleSwitch enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/75 mb-2">Language</label>
                  <select className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-purple-400/20 text-white/90 focus:border-orange-400/40 focus:outline-none transition-all duration-300">
                    {languages.map(lang => (
                      <option key={lang} value={lang} className="bg-purple-900">{lang}</option>
                    ))}
                  </select>
                </div>
              </div>
            </SettingsSection>

            {/* Security Settings */}
            <SettingsSection title="Security" icon={Shield} delay={0.4}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Key className="w-5 h-5 text-white/75" />
                    <div>
                      <p className="text-white/90 font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-white/60">Add an extra layer of security</p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
                </div>
                <div>
                  <button className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-purple-400/20 text-white/90 hover:border-orange-400/30 hover:bg-black/25 transition-all duration-300 text-left">
                    Change Password
                  </button>
                </div>
                <div>
                  <button className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-purple-400/20 text-white/90 hover:border-orange-400/30 hover:bg-black/25 transition-all duration-300 text-left">
                    View Login History
                  </button>
                </div>
              </div>
            </SettingsSection>

            {/* Data & Privacy */}
            <SettingsSection title="Data & Privacy" icon={Database} delay={0.5}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/90 font-medium">Data Sharing</p>
                    <p className="text-sm text-white/60">Share anonymized data for improvements</p>
                  </div>
                  <ToggleSwitch enabled={dataSharing} onChange={() => setDataSharing(!dataSharing)} />
                </div>
                <div>
                  <button className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-purple-400/20 text-white/90 hover:border-orange-400/30 hover:bg-black/25 transition-all duration-300 text-left">
                    Download My Data
                  </button>
                </div>
                <div>
                  <button className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-red-400/20 text-red-400 hover:border-red-400/30 hover:bg-red-900/10 transition-all duration-300 text-left">
                    Delete My Account
                  </button>
                </div>
              </div>
            </SettingsSection>

            {/* Regional Settings */}
            <SettingsSection title="Regional" icon={Globe} delay={0.6}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/75 mb-2">Timezone</label>
                  <select className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-purple-400/20 text-white/90 focus:border-orange-400/40 focus:outline-none transition-all duration-300">
                    {timezones.map(tz => (
                      <option key={tz} value={tz} className="bg-purple-900">{tz}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/75 mb-2">Date Format</label>
                  <select className="w-full bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-purple-400/20 text-white/90 focus:border-orange-400/40 focus:outline-none transition-all duration-300">
                    <option className="bg-purple-900">MM/DD/YYYY</option>
                    <option className="bg-purple-900">DD/MM/YYYY</option>
                    <option className="bg-purple-900">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </SettingsSection>
          </div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 flex justify-center"
          >
            <button className="bg-gradient-to-r from-purple-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
              Save All Changes
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Chat Bar */}
      <div className="fixed bottom-20 left-0 right-0 z-50 px-4 lg:px-6">
        <FloatingChatBar
          onSendMessage={handleSendMessage}
          placeholder="Ask about settings..."
        />
      </div>

      {/* Ticker Tape */}
      <TickerTape />
    </div>
  );
};

export default SettingsPage;