const sql = require('../sql').auth;
const debug = require('debug')('vizyul:authrepo')
 
const { getOne } = require('../db-utils');

function AuthRepository(db, pgp) {
  this.db = db;
  this.pgp = pgp;

  this.findUserByEmail = getOne(this.db, sql.findUserByEmail, 'findUserByEmail', 'email');
  this.findUserByUserId = getOne(this.db, sql.findUserByUserId, 'findUserByUserId', 'userId');
}

module.exports = AuthRepository;