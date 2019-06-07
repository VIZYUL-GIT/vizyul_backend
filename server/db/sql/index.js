const { QueryFile } = require('pg-promise');
const path = require('path');
const debug = require('debug')('ca:sql');

const sql = file => {
  const fullPath = path.join(__dirname, file);
  const qf = QueryFile(fullPath, { minify: true });
  if (qf.error) {
    debug(qf.error);
  }
  return qf;
}

module.exports = {
  user: {
    registerUser: sql('user/insertUser.sql'),
  },
  auth: {
    findUserByEmail: sql('auth/findUserByEmail.sql'),
  },
};