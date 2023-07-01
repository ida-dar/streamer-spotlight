const Streamer = require('../models/streamer.model');

const VOTE_KINDS = Object.freeze({
  UPVOTE: 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE'
})

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

// url: /streamers
exports.postOne = async (req, res) => {
  const { name, platform, description, upvotes, downvotes } = req.body;

  try {
    const newStreamer = new Streamer({
      name,
      platform,
      description,
      upvotes,
      downvotes
    });

    await newStreamer.save();
    res.json({ message: 'OK', data: newStreamer });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

// url: /streamers/:id/vote
exports.putVoteById = async (req, res) => {
  const { voteKind } = req.body

  try {
    const streamer = await Streamer.findById(req.params.id);

    if(streamer && voteKind) {
      if (voteKind === VOTE_KINDS.UPVOTE) {
        await Streamer.updateOne({ _id: req.params.id }, { $set: {
          upvotes: streamer.upvotes + 1
        }});
      } else if (voteKind === VOTE_KINDS.DOWNVOTE) {
        await Streamer.updateOne({ _id: req.params.id }, { $set: {
          downvotes: streamer.downvotes - 1
        }});
      }
      const updated = await Streamer.findById(req.params.id);
      res.json(updated);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
