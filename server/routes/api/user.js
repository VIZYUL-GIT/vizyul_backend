const express = require('express');
const debug = require('debug')('vizyul:api:user');
const passport = require('passport');

const user = require('../../api/user');
const ApiError = require('../../api/ApiError');

const router = express.Router()

router.post('/register', (req, res, next) => {
  const { name, email, password } = req.body;
  user.register(name, email, password)
  .then(
    result => {
      debug('/register returning', result);
      res.status(201).json(result);
    },
    err => next(err),
  );
});

module.exports = router
