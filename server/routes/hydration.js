const express = require('express');
const router = express.Router();
const pool = require('../db');
const { sendDbError } = require('../utils/errors');
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
    sendDbError(res, err);
  }
});

// UPDATE HYDRATION ENTRY
router.put('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;
    const { liters, hydration_date } = req.body;

    if (!hydration_date || !liters) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updated = await pool.query(
      `UPDATE hydration_logs
       SET liters = $1,
           hydration_date = $2
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [liters, hydration_date, id, userId]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: "Hydration entry not found" });
    }

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("UPDATE HYDRATION ERROR:", err);
    sendDbError(res, err);
  }
});

// DELETE HYDRATION ENTRY
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const deleted = await pool.query(
      "DELETE FROM hydration_logs WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, userId]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "Hydration entry not found" });
    }

    res.json({ message: "Hydration entry deleted" });
  } catch (err) {
    console.error("DELETE HYDRATION ERROR:", err);
    sendDbError(res, err);
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
    sendDbError(res, err);
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
    sendDbError(res, err);
  }
});

module.exports = router;
