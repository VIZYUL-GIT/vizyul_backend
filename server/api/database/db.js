// This file contains the global connections to MongoDB.
// A connection is retained for the life of the application.

const mongoose = require('mongoose');
const debug = require('debug')('vizyul:db');

const connectionURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

const connectionOptions = {
  keepAlive: 300000,
  socketTimeoutMS: 30000,

  // To avoid deprecation warnings
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose.connect(connectionURI, connectionOptions);

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const db = mongoose.connection;

db.on('connected', () => debug('Mongoose connection established'));
db.on('error', err => debug(`Mongoose error: ${err}`));
db.on('disconnected', () => debug('Mongoose disconnected'));

process.on('SIGINT', () => {
  db.close(() => {
    debug('Mongoose connection closed because Express is terminating');
    process.exit(0);
  });
});

module.exports = db;
