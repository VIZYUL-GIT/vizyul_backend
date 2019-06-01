const debug = require('debug')('vizyul:validation');
// const moment = require('moment');

const ApiError = require('./ApiError');

// FIELD VALIDATION

const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
const passwordRegex = /^[A-Za-z0-9]{6,}$/;
const usernameRegex = /^[A-Za-z0-9_-]+$$/;
const nameRegex = /^[A-Za-z0-9 -]+$/;
const emailRegex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))'
  + '@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
// const isISODate = (val) => moment(val, moment.ISO_8601, true).isValid();

const validate = (test, message, status = 400) => (value, messageOverride) => {
  if (!test(value)) {
    throw new ApiError(status, messageOverride || message);
  }
};

module.exports = {
  validateUuid: validate((val) => val && uuidRegex.test(val), 'Invalid invitation code'),
  validatePassword: validate((val) => val && passwordRegex.test(val), 'Invalid password'),
  validateUsername: validate((val) => val && usernameRegex.test(val), 'Username should be alphanumeric and not empty.'),
  validateEmail: validate((val) => val && emailRegex.test(val), 'Invalid email address.'),
  validateName: validate((val) => val && nameRegex.test(val), 'Invalid name'),
  // validateDate: validate((val) => val && isISODate(val), 'Invalid date'),
};