const Streamer = require('../models/Streamer.model');
const Voter = require('../models/Voter.model');

const VOTE_KINDS = Object.freeze({
  UPVOTE: 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE',
});

// url: /streamers
exports.getAll = async (req, res) => {
  try {
    res.json(await Streamer.find({}));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// url: /streamer/:id
exports.getOneById = async (req, res) => {
  try {
    const streamer = await Streamer.findById(req.params.id);
    if (!streamer) res.status(404).json({ message: 'Not found...' });
    else res.json(streamer);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// url: /streamers
exports.postOne = async (req, res) => {
  const { name, platform, description, upvotes, downvotes } = req.body;
  const io = req.io;

  try {
    const newStreamer = new Streamer({
      name,
      platform,
      description,
      upvotes,
      downvotes,
    });

    await newStreamer.save();
    io.emit('streamerAdded', newStreamer);
    res.json({ message: 'OK', data: newStreamer });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// url: /streamers/:id/vote
exports.putVoteById = async (req, res) => {
  const { voteKind } = req.body;
  const ip = req.clientIp;
  const io = req.io;
  const paramsId = req.params.id;

  try {
    const streamer = await Streamer.findById(paramsId);
    const voter = await Voter.findOne({ user: ip })

    if (!streamer || !voteKind) res.status(404).json({ message: 'Not found...' });

    const streamerId = streamer._id;

    if (await Voter.findOne({ user: ip, votes: streamerId })){
      res.status(500).json({ message: 'User already voted', streamerId: streamerId });
      return
    }

    // vote for streamer
    if (voteKind === VOTE_KINDS.UPVOTE) {
      await Streamer.updateOne(
        { _id: paramsId },
        {
          $set: {
            upvotes: streamer.upvotes + 1,
          },
        }
      );
    } else if (voteKind === VOTE_KINDS.DOWNVOTE) {
      await Streamer.updateOne(
        { _id: paramsId },
        {
          $set: {
            downvotes: streamer.downvotes - 1,
          },
        }
      );
    }
    if (!voter) {
      const newVoter = new Voter({ user: ip, votes: [ streamerId ] });
      await newVoter.save();
    } else {
      await Voter.updateOne({ user: ip }, { $push: { votes: streamerId } });
    }
    const updated = await Streamer.findById(streamerId);

    console.log('updated');

    io.emit('votesUpdated', updated);
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};
