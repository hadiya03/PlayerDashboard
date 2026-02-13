const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

/**
 * GET player dashboard (profile + latest readiness)
 */
router.get("/me", auth, role("player"), async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT 
        p.id,
        p.name,
        p.position,
        p.team,
        p.jersey_number,
        p.status,
        p.image,
        t.readiness,
        t.submitted_at
      FROM players p
      LEFT JOIN training_submissions t
        ON p.id = t.player_id
      WHERE p.user_id = $1
      ORDER BY t.submitted_at DESC
      LIMIT 1
      `,
      [req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to load dashboard" });
  }
});

/**
 * POST submit training data (NO readiness calculation)
 */
router.post("/submit", auth, role("player"), async (req, res) => {
  try {
    const {
      rpe, duration, sleep, soreness, tiredness,
      strength, flexibility, endurance,
      cardio, balance, agility, speed
    } = req.body;

    const player = await db.query(
      "SELECT id FROM players WHERE user_id = $1",
      [req.user.id]
    );

    if (!player.rows.length)
      return res.status(404).json({ message: "Player profile not found" });

    const submission = await db.query(
      `
      INSERT INTO training_submissions (
        player_id,
        rpe, duration, sleep, soreness, tiredness,
        strength, flexibility, endurance,
        cardio, balance, agility, speed
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *
      `,
      [
        player.rows[0].id,
        rpe, duration, sleep, soreness, tiredness,
        strength, flexibility, endurance,
        cardio, balance, agility, speed
      ]
    );

    res.json({
      message: "Training data submitted. Waiting for analyst readiness score.",
      submission: submission.rows[0]
    });
  } catch (err) {
    res.status(400).json({
      error: "Invalid data",
      detail: err.message
    });
  }
});

/**
 * GET submission history (table in your UI)
 */
router.get("/submissions", auth, role("player"), async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT 
        submitted_at,
        rpe,
        tiredness,
        sleep,
        soreness,
        readiness
      FROM training_submissions ts
      JOIN players p ON p.id = ts.player_id
      WHERE p.user_id = $1
      ORDER BY submitted_at DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Failed to load submissions" });
  }
});

module.exports = router;
