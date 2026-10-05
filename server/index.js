require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const activityRoutes = require('./routes/activities');
const sleepRoutes = require('./routes/sleep');
const meditationRoutes = require('./routes/meditation');
const hydrationRoutes = require('./routes/hydration');
const appointmentRoutes = require('./routes/appointments');
const profileRoutes = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS — IMPORTANT for Vercel frontend
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://wellness-tracker-zs-c21.vercel.app",
    "https://wellness-tracker-two-lime.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


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
app.use("/api/profile", profileRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Wellness Tracker API is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
