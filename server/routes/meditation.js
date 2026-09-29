// server/routes/meditation.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');

// ADD MEDITATION LOG
router.post('/add', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { meditation_date, duration_minutes } = req.body;

    if (!meditation_date || !duration_minutes) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await pool.query(
      `INSERT INTO meditation_logs (user_id, meditation_date, duration_minutes)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, meditation_date, duration_minutes]
    );

    res.json({
      message: "Meditation entry added successfully",
      meditation: result.rows[0]
    });

  } catch (err) {
    console.error("ADD MEDITATION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET RECENT MEDITATION LOGS (last 5)
router.get('/recent', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT *
       FROM meditation_logs
       WHERE user_id = $1
       ORDER BY meditation_date DESC, id DESC
       LIMIT 5`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("RECENT MEDITATION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET FULL MEDITATION HISTORY
router.get('/history', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT *
       FROM meditation_logs
       WHERE user_id = $1
       ORDER BY meditation_date DESC, id DESC`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("MEDITATION HISTORY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
