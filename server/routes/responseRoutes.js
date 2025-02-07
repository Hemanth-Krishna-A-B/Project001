const express = require('express');
const Response = require('../models/Response');

const router = express.Router();

// Submit a response
router.post('/', async (req, res) => {
  try {
    const { pollId, selectedOption } = req.body;
    const newResponse = new Response({ pollId, selectedOption });
    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit response' });
  }
});

// Get responses for a poll
router.get('/:pollId', async (req, res) => {
  try {
    const responses = await Response.find({ pollId: req.params.pollId });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
});

module.exports = router;
