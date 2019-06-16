'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('user_sessions', {
    sid: {
      type: 'string',
      notNull: true,
    },
    sess: {
      type: 'string',
      notNull: true,
    },
    expire: {
      type: 'timestamp',
      notNull: true,
    },
  });
};

exports.down = function(db) {
  return db.dropTable('user_sessions');
};

exports._meta = {
  "version": 2
};
