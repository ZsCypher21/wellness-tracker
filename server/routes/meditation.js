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

// UPDATE MEDITATION ENTRY
router.put('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;
    const { duration_minutes, meditation_date } = req.body;

    const updated = await pool.query(
      `UPDATE meditation_logs
       SET duration_minutes = $1,
           meditation_date = $2
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [duration_minutes, meditation_date, id, userId]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: "Meditation entry not found" });
    }

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("UPDATE MEDITATION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE MEDITATION ENTRY
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const deleted = await pool.query(
      "DELETE FROM meditation_logs WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, userId]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "Meditation entry not found" });
    }

    res.json({ message: "Meditation entry deleted" });
  } catch (err) {
    console.error("DELETE MEDITATION ERROR:", err);
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

    res