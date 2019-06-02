const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

const { User } = require('./database/User');
const ApiError = require('./ApiError');
const { success } = require('./util');

const { validateUuid, validateName, validatePassword, validateUsername, validateEmail } = require('./validate');

const register = (name, email, pword) => {
  validateName(name);
  validateEmail(email);
  validatePassword(pword);
  return User.findOne({ email })
    .then(user => {
      if (user === null) {
        const userId = uuid();
        const salt = bcrypt.genSaltSync(10);

        return User.create({ userId, name, email, password: bcrypt.hashSync(pword, salt) })
        .then(
          () => success({ userId }),
          (err) => { throw new ApiError(500, err.message); }, // escape hatch during development 
        ); 
      } else {
        throw new ApiError(400, `Email address (${email}) already exists`);
      }
    });
};

module.exports = { register };