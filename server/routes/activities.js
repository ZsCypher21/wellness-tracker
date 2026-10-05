const express = require('express');
const router = express.Router();
const pool = require('../db');
const { sendDbError } = require('../utils/errors');
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
    sendDbError(res, err);
  }
});

// UPDATE ACTIVITY
router.put('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;
    const { activity_type, duration_minutes, activity_date } = req.body;

    if (!activity_type || !duration_minutes || !activity_date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updated = await pool.query(
      `UPDATE activities
       SET activity_type = $1,
           duration_minutes = $2,
           activity_date = $3
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [activity_type, duration_minutes, activity_date, id, userId]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("UPDATE ACTIVITY ERROR:", err);
    sendDbError(res, err);
  }
});

// DELETE ACTIVITY
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const deleted = await pool.query(
      "DELETE FROM activities WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, userId]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json({ message: "Activity deleted" });
  } catch (err) {
    console.error("DELETE ACTIVITY ERROR:", err);
    sendDbError(res, err);
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
    sendDbError(res, err);
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
    sendDbError(res, err);
  }
});

module.exports = router;
