import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('App started successfully');

// HMR Connection Logger
function HMRLogger() {
  useEffect(() => {
    console.log('Vite HMR connected');
    
    // Check if HMR is available
    if (import.meta.hot) {
      console.log('HMR is available and active');
      
      // Listen for HMR updates
      import.meta.hot.on('vite:beforeUpdate', () => {
        console.log('HMR: About to update');
      });
      
      import.meta.hot.on('vite:afterUpdate', () => {
        console.log('HMR: Update completed');
      });
    } else {
      console.log('HMR is not available (production build)');
    }
  }, []);
  
  return null;
}

function AppWithHMR() {
  return (
    <>
      <HMRLogger />
      <App />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithHMR />
  </React.StrictMode>,
) 