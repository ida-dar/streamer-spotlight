const mongoose = require('mongoose');

const streamerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String, required: true },
  description: { type: String, required: true },
  upvotes: { type: Number, required: true },
  downvotes: { type: Number, required: true },
});

module.exports = mongoose.model('Streamer', streamerSchema);
