const sql = require('../sql').tableau;

const { getOne, getManyOrNone } = require('../db-utils');

function TableauRepository(db, pgp) {
  this.db = db;
  this.pgp = pgp;

  this.insertTableauServerInfo = getOne(
    this.db, 
    sql.insertTableauServerInfo, 
    'insertTableauServerInfo',
    'userId',
    'serverAppId',
    'host', 
    'port', 
    'username',
    'password',
    'contentUrl',
  );

  this.findServerByServerAppId = getOne(
    this.db,
    sql.findServerByServerAppId,
    'findServerByServerAppId',
    'serverAppId',
  );

  this.findTableauServersByUserId = getManyOrNone(
    this.db,
    sql.findTableauServersByUserId,
    'findTableauServersByUserId',
    'userId',
  );
}

module.exports = TableauRepository;