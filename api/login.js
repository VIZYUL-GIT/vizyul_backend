const bcrypt = require('bcrypt');

const { User } = require('./database/User');
const ApiError = require('./ApiError');
const { success } = require('./util');

const loginUser = (email, password) => {
  if (!email || !password) {
    throw new ApiError(500, 'email and password are required');
  }

  return User.findOne({ email: new RegExp(`^${email}$`, 'i') }, 'userId password name')
    .then((user) => {
      if(user) {
        const { password: pword, userId, name } = user;
        if (bcrypt.compareSync(password, pword)) {
          return { userId, name };
        }
      }
      throw new ApiError(404, 'Username or password invalid');
    });
} 

module.exports = { loginUser };