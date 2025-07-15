import React, { useState } from 'react';
import BrandBOSDashboard from './components/generated/BrandBOSDashboard';
import CIAAnalysisPage from './components/generated/CIAAnalysisPage';
import ContentEnginePage from './components/generated/ContentEnginePage';
import ContentCalendarPage from './components/generated/ContentCalendarPage';
import CampaignCenterPage from './components/generated/CampaignCenterPage';
import PerformancePage from './components/generated/PerformancePage';
import SettingsPage from './components/generated/SettingsPage';
import FloatingChatBubble from './components/generated/FloatingChatBubble';
import NotificationBubbles from './components/generated/NotificationBubbles';
import PersistentChatBar from './components/generated/PersistentChatBar';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatBarOpen, setIsChatBarOpen] = useState(false);

  // Page navigation handler that will be passed to sidebar
  const handlePageNavigation = (pageId: string) => {
    setCurrentPage(pageId);
    // Close mobile menu if needed
    document.body.style.overflow = 'unset';
  };

  // Render the appropriate page based on current selection
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <BrandBOSDashboard onNavigate={handlePageNavigation} />;
      case 'cia':
        return <CIAAnalysisPage onNavigate={handlePageNavigation} />;
      case 'content':
        return <ContentEnginePage onNavigate={handlePageNavigation} />;
      case 'calendar':
        return <ContentCalendarPage onNavigate={handlePageNavigation} />;
      case 'campaigns':
        return <CampaignCenterPage onNavigate={handlePageNavigation} />;
      case 'performance':
        return <PerformancePage onNavigate={handlePageNavigation} />;
      case 'settings':
        return <SettingsPage onNavigate={handlePageNavigation} />;
      default:
        return <BrandBOSDashboard onNavigate={handlePageNavigation} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Main Page Content */}
      {renderPage()}

      {/* Floating UI Elements */}
      {/* <FloatingChatBubble 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />
      
      <NotificationBubbles />
      
      {isChatBarOpen && (
        <PersistentChatBar 
          onClose={() => setIsChatBarOpen(false)} 
        />
      )} */}
    </div>
  );
};

export default App;
