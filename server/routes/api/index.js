const express = require('express');

const user = require('./user');
const file = require('./file');
const session = require('./session');
const tableau = require('./tableau');

const router = express.Router()

router.use('/session', session);
router.use('/file', file);
router.use('/user', user);
router.use('/tableau', tableau);

router.get('/health', (req, res) => {
  res.status(200).json({ status: true, message: 'OK' });
});

module.exports = router;