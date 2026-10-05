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

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not set - logins will fail. Add it in Render > Environment.");
}

// CORS: allowed frontends. Extra origins can be added in Render with
// FRONTEND_URL (comma-separated) without changing code.
const allowedOrigins = [
  "http://localhost:5173",
  "https://wellness-tracker-zs-c21.vercel.app",
  "https://wellness-tracker-two-lime.vercel.app",
  ...(process.env.FRONTEND_URL || "").split(",").map((o) => o.trim()).filter(Boolean),
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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

// Unknown API routes -> JSON 404 instead of an HTML page
app.use('/api', (req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Malformed JSON bodies and any other unhandled errors -> JSON response
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: "Invalid JSON body" });
  }
  console.error("UNHANDLED ERROR:", err);
  res.status(500).json({ message: "Server error" });
});

// Create any missing tables before accepting requests
const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function initDb() {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(schema);
  console.log('Database schema ready');
}

initDb()
  .catch((err) => console.error('DB INIT ERROR:', err))
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  });
