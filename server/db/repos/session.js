const sql = require('../sql').session;

const { getOne } = require('../db-utils');

function SessionRepository(db, pgp) {
  this.db = db;
  this.pgp = pgp;

  this.createSession = getOne(
    this.db, 
    sql.insertSession, 
    'createSession', 
    'userId', 
    'sessionAppId', 
    'name'
  );

  this.findSessionBySessionAppId = getOne(
    this.db, 
    sql.findSessionBySessionAppId, 
    'findSessionBySessionAppId', 
    'sessionAppId'
  );

  this.insertFileUpload = getOne(
    this.db, 
    sql.insertFileUpload, 
    'insertFileUpload', 
    'userId', 
    'sessionId', 
    'fileAppId', 
    'fileName'
  );
}

module.exports = SessionRepository;