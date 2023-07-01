const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const socket = require('socket.io');

const app = express();

// import routes
const streamerRoutes = require('./src/routes/streamer.routes');

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(helmet());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', streamerRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});


const NODE_ENV = process.env.NODE_ENV;
let dbUrl = '';
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;

// DB
if(NODE_ENV === 'production') dbUrl = `mongodb+srv://${username}:${password}@cluster0.pw3m4.mongodb.net/StreamerSpotlight?retryWrites=true&w=majority`;
else if (NODE_ENV === 'test') dbUrl = 'mongodb://localhost:27017/StreamerSpotlightTest';
else dbUrl = 'mongodb://localhost:27017/StreamerSpotlight';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

module.exports = server;

const io = socket(server);

io.on('connection', (socket) => {
  console.log(`New socket, it's id: ${socket.id}`);
});
