import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import Sleep from './pages/Sleep';
import Meditation from './pages/Meditation';
import Hydration from './pages/Hydration';
import Appointments from './pages/Appointments';
import AppointmentHistory from './pages/AppointmentHistory';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

export default function App() {
  return (    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/hydration" element={<Hydration />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/history" element={<AppointmentHistory />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}