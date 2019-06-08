const debug = require('debug')('vizyul:passport');

const { db, errors } = require('../db');

const local = require('./local');
const linkedin = require('./linkedin');

module.exports = (passport) => {
  passport.serializeUser((userInfo, done) => {
    debug('serializeUser', userInfo);
    done(null, userInfo);
  });

  passport.deserializeUser((userInfo, done) => {
    debug('deserializeUser', userInfo);
    const { userAppId } = userInfo;

    db.auth.findUserByUserId(userAppId)
    .then(
      () => { debug('find succeeded', userInfo); return done(null, userInfo); },
      () => { debug('find failed'); return done(null, false, { message: 'Invalid user information' }); },
    );
  });

  passport.use('local', local);
  // passport.use('linkedin', linkedin);
};