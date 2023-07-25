const Streamer = require('./Streamer.model');
const Voter = require('../voter/Voter.model');
const { sanitize } = require('express-mongo-sanitize');

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

  const cleanStreamer = {
    // I did not sanitaze the name as some streamers names may contain special characters
    platform: await sanitize(platform),
    description: await sanitize(description, {allowDots: true}),
  }

  try {

    if (!name || !platform || !description) {
      res.status(400).json({ message: 'Unsufficient data provided' });
      return
    }

    const newStreamer = new Streamer({
      name,
      ...cleanStreamer,
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

    if (streamer && voteKind) {
      const streamerId = streamer._id;

      if (await Voter.findOne({ user: ip, votes: streamerId })){
        res.status(400).json({ message: 'User already voted', streamerId: streamerId });
        return
      }

      // vote for streamer
      if (voteKind === VOTE_KINDS.UPVOTE) {
        await Streamer.updateOne(
          { _id: streamerId },
          {
            $set: {
              upvotes: streamer.upvotes + 1,
            },
          }
        );
      } else if (voteKind === VOTE_KINDS.DOWNVOTE) {
        await Streamer.updateOne(
          { _id: streamerId },
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

      io.emit('votesUpdated', updated);
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: 'Not found...' })
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
