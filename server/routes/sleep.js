// server/routes/sleep.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');

// ADD SLEEP LOG
router.post('/add', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { sleep_date, hours_slept } = req.body;

    if (!sleep_date || !hours_slept) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await pool.query(
      `INSERT INTO sleep_logs (user_id, sleep_date, hours_slept)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, sleep_date, hours_slept]
    );

    res.json({
      message: "Sleep entry added successfully",
      sleep: result.rows[0]
    });

  } catch (err) {
    console.error("ADD SLEEP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET RECENT SLEEP LOGS (last 5)
router.get('/recent', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT *
       FROM sleep_logs
       WHERE user_id = $1
       ORDER BY sleep_date DESC, id DESC
       LIMIT 5`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("RECENT SLEEP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET FULL SLEEP HISTORY
router.get('/history', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT *
       FROM sleep_logs
       WHERE user_id = $1
       ORDER BY sleep_date DESC, id DESC`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("SLEEP HISTORY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
