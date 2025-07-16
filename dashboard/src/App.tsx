import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BrandBOSDashboard from './components/generated/BrandBOSDashboard'
import CIAPage from './components/generated/CIAPage'
import CampaignCenterPage from './components/generated/CampaignCenterPage'
import PerformancePage from './components/generated/PerformancePage'
import SettingsPage from './components/generated/SettingsPage'
import ContentCalendarPage from './components/generated/ContentCalendarPage'
import ContentEnginePage from './components/generated/ContentEnginePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrandBOSDashboard />} />
        <Route path="/cia" element={<CIAPage />} />
        <Route path="/campaign" element={<CampaignCenterPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/content-calendar" element={<ContentCalendarPage />} />
        <Route path="/content-engine" element={<ContentEnginePage />} />
      </Routes>
    </Router>
  )
}

export default App