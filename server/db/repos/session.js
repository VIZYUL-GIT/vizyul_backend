const sql = require('../sql').session;

class SessionRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  createSession(user_id, session_app_id, name) {
    // Returns the newly minted session_id 
    return this.db.one(sql.insertSession, [user_id, session_app_id, name]);
  }

  findSessionBySessionAppId(sessionAppId) {
    return this.db.one(sql.findSessionBySessionAppId, sessionAppId);
  }

  insertFileUpload(user_id, session_id, fileAppId, fileName) {
    return this.db.one(sql.insertFileUpload, [user_id, session_id, fileAppId, fileName]);
  }
}

module.exports = SessionRepository;