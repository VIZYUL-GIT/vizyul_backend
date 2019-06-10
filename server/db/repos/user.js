const sql = require('../sql').user;

const { getResult } = require('../db-utils');

function UserRepository(db, pgp) {
  this.db = db;
  this.pgp = pgp;

  this.registerUser = getResult(this.db, sql.registerUser, 'registerUser', 'id', 'name', 'email', 'password');
}

module.exports = UserRepository;