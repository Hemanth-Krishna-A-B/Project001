const express = require('express');
const Poll = require('../models/Poll');
const router = express.Router();

// Get all polls
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch polls' });
  }
});

// Create a new poll
router.post('/', async (req, res) => {
  try {
    const { question, options, sessionCode } = req.body;
    const newPoll = new Poll({ question, options, sessionCode });
    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create poll' });
  }
});

module.exports = router;
