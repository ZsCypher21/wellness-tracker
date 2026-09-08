/*
 * Core application component responsible for:
 * - Rendering global layout (Navbar + Footer)
 * - Defining all client-side routes using React Router v6
 * - Applying ProtectedRoute to authenticated pages
 * - Handling layout visibility (hide Navbar/Footer on login)
 */

import { Routes, Route, useLocation } from "react-router-dom";

// Layout components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

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

// History pages (past logs for each wellness module)
import ActivitiesHistory from "./pages/history/ActivitiesHistory";
import SleepHistory from "./pages/history/SleepHistory";
import MeditationHistory from "./pages/history/MeditationHistory";
import HydrationHistory from "./pages/history/HydrationHistory";
import AppointmentsHistory from "./pages/history/AppointmentsHistory";

// Progress dashboard
import Progress from "./pages/Progress";

// Route guard for authenticated pages
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const location = useLocation();

  /**
   * Layout visibility logic:
   * - Navbar and Footer should NOT appear on the login page.
   * - This prevents showing user info before authentication
   *   and keeps the login screen clean and distraction-free.
   */
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {/* Conditionally render Navbar (hidden on login page) */}
      {!hideLayout && <Navbar />}

      {/* Route definitions for the entire application */}
      <Routes>

        {/* Public Routes -------------------------------------------------- */}

        {/* Login page (public) */}
        <Route path="/login" element={<Login />} />

        {/* Default route → redirect users to Login */}
        <Route path="/" element={<Login />} />


        {/* Protected Routes ---------------------------------------------- */}
        {/* These routes require authentication and are wrapped in ProtectedRoute */}

        {/* Dashboard (main authenticated landing page) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Activities */}
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

        {/* Sleep */}
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

        {/* Meditation */}
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

        {/* Hydration */}
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

        {/* Appointments */}
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

        {/* Progress Dashboard */}
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />


        {/* Fallback Route -------------------------------------------------- */}
        {/* Any unknown path → NotFound page */}
        <Route path="*" element={<NotFound />} />

      </Routes>

      {/* Conditionally render Footer (hidden on login page) */}
      {!hideLayout && <Footer />}
    </>
  );
}
