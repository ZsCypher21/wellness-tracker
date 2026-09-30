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

// UPDATE SLEEP ENTRY
router.put('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;
    const { hours_slept, sleep_date } = req.body;

    const updated = await pool.query(
      `UPDATE sleep_logs
       SET hours_slept = $1,
           sleep_date = $2
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [hours_slept, sleep_date, id, userId]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: "Sleep entry not found" });
    }

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("UPDATE SLEEP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// DELETE SLEEP ENTRY
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const deleted = await pool.query(
      "DELETE FROM sleep_logs WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, userId]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "Sleep entry not found" });
    }

    res.json({ message: "Sleep entry deleted" });
  } catch (err) {
    console.error("DELETE SLEEP ERROR:", err);
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
