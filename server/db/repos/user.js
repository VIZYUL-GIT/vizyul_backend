const sql = require('../sql').user;

class UserRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  registerUser(id, name, email, password) {
    return this.db.result(sql.registerUser, [id, name, email, password]);
  }
}

module.exports = UserRepository;