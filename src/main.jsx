/**
 * main.jsx
 * -----------------------------
 * Application entry point.
 *
 * Responsibilities:
 * - Mount the React application into the DOM.
 * - Wrap the entire app with BrowserRouter for client-side routing.
 * - Provide global state using multiple Context Providers (Auth, Sleep, Hydration, Meditation, Activity, Appointment).
 * - Import global CSS styles.
 *
 * This file establishes the top-level architecture of the Wellness Tracker app.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Global stylesheet applied across the entire application
import "./styles/global.css";

// React Router for navigation between pages
import { BrowserRouter } from "react-router-dom";

// Authentication context (handles login, logout, session persistence)
import { AuthProvider } from "./context/AuthContext.jsx";

// Feature-specific context providers (shared state for each wellness module)
import { SleepProvider } from "./context/SleepContext.jsx";
import { HydrationProvider } from "./context/HydrationContext.jsx";
import { MeditationProvider } from "./context/MeditationContext.jsx";
import { ActivityProvider } from "./context/ActivityContext.jsx";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";

// Mount the React application into the #root element in index.html
ReactDOM.createRoot(document.getElementById("root")).render(

  /**
   * BrowserRouter enables client-side routing throughout the app.
   * All pages and navigation logic depend on this wrapper.
   *
   * This layered structure ensures clean separation of concerns and scalable architecture.
   */

    <BrowserRouter>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
);
