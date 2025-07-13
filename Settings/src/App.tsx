import { useMemo } from 'react';
import { Container, Theme } from './settings/types';
import BrandBOSDashboard from './components/generated/BrandBOSDashboard';
import BrandIntelligencePage from './components/generated/BrandIntelligencePage';
import ContentEnginePage from './components/generated/ContentEnginePage';
import ContentCalendarPage from './components/generated/ContentCalendarPage';
import CampaignCenterPage from './components/generated/CampaignCenterPage';
import PerformancePage from './components/generated/PerformancePage';
import SettingsPage from './components/generated/SettingsPage';

let theme: Theme = 'light';
let container: Container = 'none';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const generatedComponent = useMemo(() => {
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    return <SettingsPage />; // <PerformancePage />; // <CampaignCenterPage />; // <ContentCalendarPage />; // <ContentEnginePage />; // <BrandIntelligencePage />; // <BrandBOSDashboard />
  }, []);

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {generatedComponent}
      </div>
    );
  } else {
    return generatedComponent;
  }
}

export default App;
