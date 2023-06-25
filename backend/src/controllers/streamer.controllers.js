const Streamer = require('../models/streamer.model');

// url: /streamers
exports.getAll = async (req, res) => {
  try {
    res.json(await Streamer.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// url: /streamer/:id
exports.getOneById = async (req, res) => {
  try {
    const streamer = await Streamer.findById(req.params.id);
    if(!streamer) res.status(404).json({ message: 'Not found...' });
    else res.json(streamer);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// url: /streamer
exports.postOne = async (req, res) => {
  const { name, platform, description, votes } = req.body;

  console.log(req.body);

  try {
    const newStreamer = new Streamer({
      name,
      platform,
      description,
      votes
    });

    console.log(newStreamer);
    await newStreamer.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

// url: /streamers/:id/vote
exports.putVoteById = async (req, res) => {
  try {
    const streamer = await Streamer.findById(req.params.id);
    console.log(streamer, req.params.id);
    if(streamer) {

      await Streamer.updateOne({ _id: req.params.id }, { $set: {
        votes: streamer.votes + 1
      }});
      const updated = await Streamer.findById(req.params.id);
      res.json(updated);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};