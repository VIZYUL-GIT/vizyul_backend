const bcrypt = require('bcrypt');
const debug = require('debug')('vizyul:api:login');

const { db, errors } = require('../db');
const ApiError = require('./ApiError');
const { success } = require('./util');
const { validateEmail, validatePassword } = require('./validate');

const QueryResultError = errors.QueryResultError;
const qrec = errors.queryResultErrorCode;

const loginUser = (email, password) => {
  validateEmail(email);
  validatePassword(password);
  
  return new Promise((resolve, reject) => {
    db.auth.findUserByEmail(email)
      .then((user) => {
        debug('findUserByEmail returned', user);
        const { user_id, user_password, user_app_id, user_name, user_email } = user;
        if (bcrypt.compareSync(password, user_password)) {
          resolve({ userId: user_id, userAppId: user_app_id, name: user_name, email: user_email });
        }
        reject(new ApiError(403, 'Login failed'));
      })
      .catch((err) => {
        if (err instanceof QueryResultError) {
          if (err.code == qrec.noData) {
            reject(new ApiError(404, 'User not found'));
          }
        }
        reject(err);
      });
  });
}

module.exports = { loginUser };