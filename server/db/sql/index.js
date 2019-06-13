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
    findUserByUserId: sql('auth/findUserByUserId.sql'),
  },
  session: {
    insertSession: sql('session/insertSession.sql'),
    insertFileUpload: sql('session/insertFileUpload.sql'),
    findSessionBySessionAppId: sql('session/findSessionBySessionAppId.sql'),
  },
  tableau: {
    insertTableauServerInfo: sql('tableau/insertTableauServerInfo.sql'),
    findServerByServerAppId: sql('tableau/findServerByServerAppId.sql'),
    findTableauServersByUserId: sql('tableau/findTableauServersByUserId.sql'),
  },
};