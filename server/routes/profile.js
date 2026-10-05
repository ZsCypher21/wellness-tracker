const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require("../middleware/authMiddleware");

// GET PROFILE
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const userResult = await pool.query(
      "SELECT id, email, full_name FROM users WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    const settingsResult = await pool.query(
      `SELECT bio, sleep_goal, hydration_goal, meditation_goal, activity_goal
       FROM user_settings
       WHERE user_id = $1`,
      [userId]
    );

    const settings = settingsResult.rows[0] || {
      bio: "",
      sleep_goal: 0,
      hydration_goal: 0,
      meditation_goal: 0,
      activity_goal: 0,
    };

    res.json({
      id: user.id,
      email: user.email,
      name: user.full_name,
      bio: settings.bio,
      sleep_goal: settings.sleep_goal,
      hydration_goal: settings.hydration_goal,
      meditation_goal: settings.meditation_goal,
      activity_goal: settings.activity_goal,
    });

  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE PROFILE
router.post("/update", auth, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const {
      name,
      bio,
      sleep_goal,
      hydration_goal,
      meditation_goal,
      activity_goal,
    } = req.body;

    // Update name if provided
    if (name !== undefined) {
      await pool.query(
        "UPDATE users SET full_name = $1 WHERE id = $2",
        [name, userId]
      );
    }

    // Upsert user settings
    await pool.query(
      `INSERT INTO user_settings (
         user_id, bio, sleep_goal, hydration_goal, meditation_goal, activity_goal, updated_at
       )
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET
         bio = EXCLUDED.bio,
         sleep_goal = EXCLUDED.sleep_goal,
         hydration_goal = EXCLUDED.hydration_goal,
         meditation_goal = EXCLUDED.meditation_goal,
         activity_goal = EXCLUDED.activity_goal,
         updated_at = NOW()`,
      [
        userId,
        bio || "",
        sleep_goal ?? 0,
        hydration_goal ?? 0,
        meditation_goal ?? 0,
        activity_goal ?? 0,
      ]
    );

    res.json({ message: "Profile updated successfully" });

  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
