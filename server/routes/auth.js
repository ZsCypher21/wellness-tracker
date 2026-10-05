const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { sendDbError } = require('../utils/errors');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { full_name, password } = req.body;
    const email = String(req.body.email || "").trim().toLowerCase();

    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await pool.query(
      "SELECT id FROM users WHERE LOWER(email) = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (full_name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, full_name, email`,
      [full_name, email, hashed]
    );

    const token = jwt.sign(
      { user_id: newUser.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Registration successful",
      user: {
        id: newUser.rows[0].id,
        name: newUser.rows[0].full_name,
        email: newUser.rows[0].email
      },
      token
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    sendDbError(res, err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;
    const email = String(req.body.email || "").trim().toLowerCase();

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const userRes = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = $1",
      [email]
    );

    if (userRes.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = userRes.rows[0];

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { user_id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email
      },
      token
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    sendDbError(res, err);
  }
});

module.exports = router;
