const express = require('express');
const debug = require('debug')('vizyul:api:user');
const passport = require('passport');

const authenticate = require('../auth-check');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ status: true, user: req.user });
});

router.post('/logout', authenticate, (req, res) => {
  debug('/logout called');
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ status: true, message: 'Logged out.' });
    }
  });
});

router.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

module.exports = router;