const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const socket = require('socket.io');
const requestIp = require('request-ip');
const connectToDB = require('./db');
const mongoose = require('mongoose');

const app = express();

// import routes
const streamerRoutes = require('./src/routes/streamer.routes');

app.use((req, res, next) => {
  req.io = io;
  req.clientIp = requestIp.getClientIp(req);
  next();
});

app.use(helmet());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Request user's IP address.
// Will be used to check if user already voted for a streamer. This can be replaced later on by introducing login functionality
app.use(requestIp.mw());

app.use('/api', streamerRoutes);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

// DB
connectToDB()

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

module.exports = server;

const io = socket(server);

io.on('connection', (socket) => {
  // uncomment the line below to control socket connection
  // console.log(`New socket, it's id: ${socket.id}`);
});
