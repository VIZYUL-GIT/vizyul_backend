const express = require('express');

const user = require('./user');
// const file = require('./file')
// const xpath = require('./xpath')
// const UserCtrl = require('../controllers/user')

const router = express.Router()

router.get('/health', (req, res) => {
  res.status(200).json({ status: true, message: 'OK' });
});

router.use('/user', user);

// User Dashboard api
// router.use('/user', user)
// router.use('/file', file)
// router.use('/xpath', xpath)
module.exports = router