import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

import { ActivityProvider } from './context/ActivityContext.jsx';
import { SleepProvider } from './context/SleepContext.jsx';
import { MeditationProvider } from './context/MeditationContext.jsx';
import { HydrationProvider } from './context/HydrationContext.jsx';
import { AppointmentProvider } from './context/AppointmentContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ActivityProvider>
      <SleepProvider>
        <MeditationProvider>
          <HydrationProvider>
            <AppointmentProvider>
              <App />
            </AppointmentProvider>
          </HydrationProvider>
        </MeditationProvider>
      </SleepProvider>
    </ActivityProvider>
  </React.StrictMode>
);