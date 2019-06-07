const sql = require('../sql').auth;

class AuthRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  findUserByEmail(email) {
    return this.db.one(sql.findUserByEmail, email);
  }
}

module.exports = AuthRepository;