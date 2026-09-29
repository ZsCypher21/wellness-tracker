// server/routes/hydration.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');

// ADD HYDRATION LOG
router.post('/add', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { hydration_date, liters } = req.body;

    if (!hydration_date || !liters) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await pool.query(
      `INSERT INTO hydration_logs (user_id, hydration_date, liters)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, hydration_date, liters]
    );

    res.json({
      message: "Hydration entry added successfully",
      hydration: result.rows[0]
    });

  } catch (err) {
    console.error("ADD HYDRATION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET RECENT HYDRATION LOGS (last 5)
router.get('/recent', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT *
       FROM hydration_logs
       WHERE user_id = $1
       ORDER BY hydration_date DESC, id DESC
       LIMIT 5`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("RECENT HYDRATION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET FULL HYDRATION HISTORY
router.get('/history', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT *
       FROM hydration_logs
       WHERE user_id = $1
       ORDER BY hydration_date DESC, id DESC`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("HYDRATION HISTORY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
