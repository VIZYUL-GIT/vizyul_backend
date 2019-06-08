const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const debug = require('debug')('vizyul:api:register');

const { db, errors } = require('../db');
const ApiError = require('./ApiError');
const { success } = require('./util');

const { validatePassword, validateName, validateEmail } = require('./validate');

const register = (
  name,
  email,
  password,
) => {
  validatePassword(password);
  validateEmail(email);
  validateName(name);

  return new Promise((resolve, reject) => {
    const userId = uuid();
    const salt = bcrypt.genSaltSync(10);

    const encrypted = bcrypt.hashSync(password, salt);

    debug('encrypted', encrypted);

    db.user.registerUser(userId, name, email, encrypted)
      .then((result) => {
        debug('register user returned', result);
        if (!result.rowCount) {
          reject(new ApiError(500, 'Error inserting new user.'));
        } else {
          resolve(success({ message: 'Registration successful' }));
        }
      })
      .catch((err) => {
        if (err.code === '23505') { // unique_violation
          reject(new ApiError(400, 'The email address you entered is in use. Please try another one.'));
        } else {
          reject(err);
        }
      });
  });
};

module.exports = { register };