import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ProfileProvider } from "./context/ProfileContext.jsx";

import { SleepProvider } from "./context/SleepContext.jsx";
import { HydrationProvider } from "./context/HydrationContext.jsx";
import { MeditationProvider } from "./context/MeditationContext.jsx";
import { ActivityProvider } from "./context/ActivityContext.jsx";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ProfileProvider>
        <SleepProvider>
          <HydrationProvider>
            <MeditationProvider>
              <ActivityProvider>
                <AppointmentProvider>
                  <App />
                </AppointmentProvider>
              </ActivityProvider>
            </MeditationProvider>
          </HydrationProvider>
        </SleepProvider>
      </ProfileProvider>
    </AuthProvider>
  </BrowserRouter>
);
