// server/routes/activities.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');

// ADD ACTIVITY
router.post('/add', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { activity_type, duration_minutes, activity_date } = req.body;

    if (!activity_type || !duration_minutes || !activity_date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await pool.query(
      `INSERT INTO activities (user_id, activity_type, duration_minutes, activity_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, activity_type, duration_minutes, activity_date]
    );

    res.json({
      message: "Activity added successfully",
      activity: result.rows[0]
    });

  } catch (err) {
    console.error("ADD ACTIVITY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET RECENT ACTIVITIES (last 5)
router.get('/recent', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT *
       FROM activities
       WHERE user_id = $1
       ORDER BY activity_date DESC, id DESC
       LIMIT 5`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("RECENT ACTIVITIES ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET FULL HISTORY
router.get('/history', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT *
       FROM activities
       WHERE user_id = $1
       ORDER BY activity_date DESC, id DESC`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("ACTIVITY HISTORY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
