const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Poll = require('./Poll'); // Import the Poll model

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/slido-clone', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Example route to create a new poll
app.post('/api/polls', async (req, res) => {
  const { question, options, sessionCode } = req.body;
  const newPoll = new Poll({ question, options, sessionCode });
  try {
    await newPoll.save(); // Save poll to the database
    res.status(201).json(newPoll); // Respond with the newly created poll
  } catch (err) {
    res.status(400).json({ error: 'Failed to create poll' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
