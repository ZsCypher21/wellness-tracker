const express = require('express');
const router = express.Router();
const pool = require('../db');
const { sendDbError } = require('../utils/errors');
const auth = require('../middleware/authMiddleware');

// ADD APPOINTMENT
router.post('/add', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { appointment_type, description, appointment_datetime } = req.body;

    if (!appointment_type || !appointment_datetime) {
      return res.status(400).json({ message: "Appointment type and datetime are required" });
    }

    const result = await pool.query(
      `INSERT INTO appointments (user_id, appointment_type, description, appointment_datetime)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, appointment_type, description || null, appointment_datetime]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error("ADD APPOINTMENT ERROR:", err);
    sendDbError(res, err);
  }
});

// GET UPCOMING APPOINTMENTS
router.get('/upcoming', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT *
       FROM appointments
       WHERE user_id = $1
       AND appointment_datetime > NOW()
       ORDER BY appointment_datetime ASC`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("UPCOMING APPOINTMENTS ERROR:", err);
    sendDbError(res, err);
  }
});

// GET PAST APPOINTMENTS
router.get('/past', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT *
       FROM appointments
       WHERE user_id = $1
       AND appointment_datetime <= NOW()
       ORDER BY appointment_datetime DESC`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("PAST APPOINTMENTS ERROR:", err);
    sendDbError(res, err);
  }
});

// UPDATE APPOINTMENT
router.put('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;
    const { appointment_type, description, appointment_datetime } = req.body;

    if (!appointment_type || !appointment_datetime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updated = await pool.query(
      `UPDATE appointments
       SET appointment_type = $1,
           description = $2,
           appointment_datetime = $3
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [appointment_type, description, appointment_datetime, id, userId]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(updated.rows[0]);

  } catch (err) {
    console.error("UPDATE APPOINTMENT ERROR:", err);
    sendDbError(res, err);
  }
});

// DELETE APPOINTMENT
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const deleted = await pool.query(
      "DELETE FROM appointments WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, userId]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted" });

  } catch (err) {
    console.error("DELETE APPOINTMENT ERROR:", err);
    sendDbError(res, err);
  }
});

module.exports = router;
