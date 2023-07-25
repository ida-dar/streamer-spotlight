const mongoose = require('mongoose');

const connectToDB = () => {
  let dbUrl = '';
  const NODE_ENV = process.env.NODE_ENV;
  const username = process.env.MONGO_USER;
  const password = process.env.MONGO_PASS;

  // DB
  if (NODE_ENV === 'production') dbUrl = `mongodb+srv://${username}:${password}@cluster0.pw3m4.mongodb.net/StreamerSpotlight?retryWrites=true&w=majority`;
  else if (NODE_ENV === 'test') dbUrl = 'mongodb://localhost:27017/StreamerSpotlightTest';
  else dbUrl = 'mongodb://localhost:27017/StreamerSpotlight';

  mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connected to the database');
  });
  db.on('error', (err) => console.log('Error ' + err));

};

module.exports = connectToDB;
