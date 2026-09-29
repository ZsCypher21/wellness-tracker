// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
// Future routes (we will add these one by one)
const activityRoutes = require('./routes/activities');
const sleepRoutes = require('./routes/sleep');
const meditationRoutes = require('./routes/meditation');
const hydrationRoutes = require('./routes/hydration');
const appointmentRoutes = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', async (req, res) => {
  try {
    res.json({
      status: 'ok',
      time: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Health check error:', err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/sleep', sleepRoutes);
app.use('/api/meditation', meditationRoutes);
app.use('/api/hydration', hydrationRoutes);
app.use('/api/appointments', appointmentRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Wellness Tracker API is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
