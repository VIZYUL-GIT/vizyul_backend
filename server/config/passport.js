const debug = require('debug')('vizyul:passport');

const { findUserByUserId } = require('../../api/user');
const local = require('./local');
const linkedin = require('./linkedin');

const { User } = require('../../api/database/User');

module.exports = (passport) => {
  passport.serializeUser((userInfo, done) => {
    debug('serializeUser', userInfo);
    done(null, userInfo);
  });

  passport.deserializeUser((userInfo, done) => {
    debug('deserializeUser', userInfo);
    const { userId } = userInfo;
    
    User.findOne({ userId })
      .then(
        () => done(null, userInfo),
        () => done(null, false, { message: 'Invalid user information' }),
      );
  });

  passport.use('local', local);
  passport.use('linkedin', linkedin);
};