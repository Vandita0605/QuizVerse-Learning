const express = require("express");
const router = express.Router();
const Score = require("../Models/Score");

// Save quiz score
router.post("/", async (req, res) => {
  const score = new Score({
    userId: req.body.userId,
    quizId: req.body.quizId,
    score: req.body.score
  });

  try {
    const savedScore = await score.save();
    res.status(201).json(savedScore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get score history for a user
router.get("/:userId", async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.params.userId });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;