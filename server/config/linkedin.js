const debug = require('debug')('vizyul:local');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const uuid = require('uuid/v4');

const loginUser = require('../../api/login').loginUser;

module.exports = new LinkedInStrategy(
  {
    clientID: process.env.LINKEDIN_CONSUMER_KEY,
    clientSecret: process.env.LINKEDIN_CONSUMER_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK_URL,
    scope: ['r_basicprofile', 'r_emailaddress'],
    state: true,
  }, 
  (token, refreshToken, profile, done) => {
    User.findOrCreate({ linkedIn: profile.id }, {
      userId: uuid(),
      name: profile.displayName,
      email: profile.emails[0].value,
      tokens: [{ token, kind: 'linkedin' }, { refreshToken, kind: 'linkedin-refresh' }],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  }
);