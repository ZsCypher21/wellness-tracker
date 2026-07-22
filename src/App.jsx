import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import DashboardPage from './pages/DashboardPage';
import ActivitiesPage from './pages/ActivitiesPage';
import SleepPage from './pages/SleepPage';
import MeditationPage from './pages/MeditationPage';
import HydrationPage from './pages/HydrationPage';
import AppointmentsPage from './pages/AppointmentsPage';
import AppointmentHistoryPage from './pages/AppointmentHistoryPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/sleep" element={<SleepPage />} />
        <Route path="/meditation" element={<MeditationPage />} />
        <Route path="/hydration" element={<HydrationPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/appointments/history" element={<AppointmentHistoryPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<DashboardPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}