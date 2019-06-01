const debug = require('debug')('vizyul:local');
const LocalStrategy = require('passport-local').Strategy;

const loginUser = require('../../api/login').loginUser;

module.exports = new LocalStrategy((email, password, done) => {
  loginUser(email, password)
  .then((user) => { debug('user login successful', user); done(null, user); })
  .catch((err) => { debug('user login failed', err); done(err); });
});