const express = require('express');
const debug = require('debug')("vizyul:routes:api:session")
const passport = require('passport');

const { createSession } = require('../../api/session');
const authenticate = require('../auth-check');

const router = express.Router()

router.post('/create', authenticate, (req, res, next) => {
  debug('req.body', req.body);
  const { sessionAppId, sessionName } = req.body;
  debug(`/api/session/create [req.user=${req.user}]`);
  const { userId } = req.user;
  createSession(userId, sessionAppId, sessionName)
    .then(response => {
      debug('/session received', response);
      res.status(201).send(response);
    })
    .catch(err => next(err));
});


module.exports = router
