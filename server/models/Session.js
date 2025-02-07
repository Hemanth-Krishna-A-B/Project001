const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionCode: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
