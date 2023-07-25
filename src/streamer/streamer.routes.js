const express = require('express');
const router = express.Router();

const StreamerController = require('./streamer.controllers');

// GET
router.get('/streamers', StreamerController.getAll);
router.get('/streamer/:id', StreamerController.getOneById);

// POST
router.post('/streamers', StreamerController.postOne);

// PUT
router.put('/streamers/:id/vote', StreamerController.putVoteById);

module.exports = router;
