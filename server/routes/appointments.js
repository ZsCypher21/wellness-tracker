// server/routes/appointments.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
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

    res.json({
      message: "Appointment added successfully",
      appointment: result.rows[0]
    });

  } catch (err) {
    console.error("ADD APPOINTMENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
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
    res.status(500).json({ message: "Server error" });
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
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
