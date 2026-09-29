/*
 * Core application component responsible for:
 * - Rendering global layout (Navbar + Footer)
 * - Defining all client-side routes using React Router v6
 * - Applying ProtectedRoute to authenticated pages
 * - Handling layout visibility (hide Navbar/Footer on login)
 */

import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

// Layout components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Sidebar
import Sidebar from "./components/layout/Sidebar";

// Error / fallback page
import NotFound from "./pages/NotFound";

// Public pages
import Login from "./pages/Login";

// Dashboard (authenticated home)
import Dashboard from "./pages/Dashboard";

// Wellness feature pages
import Activities from "./pages/Activities";
import Sleep from "./pages/Sleep";
import Meditation from "./pages/Meditation";
import Hydration from "./pages/Hydration";
import Appointments from "./pages/Appointments";

// History pages
import ActivitiesHistory from "./pages/history/ActivitiesHistory";
import SleepHistory from "./pages/history/SleepHistory";
import MeditationHistory from "./pages/history/MeditationHistory";
import HydrationHistory from "./pages/history/HydrationHistory";
import AppointmentsHistory from "./pages/history/AppointmentsHistory";

// Progress dashboard
import Progress from "./pages/Progress";

// Route guard
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const location = useLocation();

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(prev => !prev);
  }

  /**
   * Hide Navbar + Footer on login page
   */
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {/* Navbar */}
      {!hideLayout && <Navbar onToggleSidebar={toggleSidebar} />}

      {/* Sidebar + Overlay */}
      {!hideLayout && (
        <>
          <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

          <div
            className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
            onClick={toggleSidebar}
          />
        </>
      )}

      {/* Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Default route → Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <Activities />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activities/history"
          element={
            <ProtectedRoute>
              <ActivitiesHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sleep"
          element={
            <ProtectedRoute>
              <Sleep />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sleep/history"
          element={
            <ProtectedRoute>
              <SleepHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meditation"
          element={
            <ProtectedRoute>
              <Meditation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meditation/history"
          element={
            <ProtectedRoute>
              <MeditationHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hydration"
          element={
            <ProtectedRoute>
              <Hydration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hydration/history"
          element={
            <ProtectedRoute>
              <HydrationHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments/history"
          element={
            <ProtectedRoute>
              <AppointmentsHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer */}
      {!hideLayout && <Footer />}
    </>
  );
}
