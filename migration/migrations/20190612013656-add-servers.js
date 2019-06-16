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
  return db.createTable('servers', {
    user_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      foreignKey: {
        name: 'servers_user_id_fkey',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'user_id',
      },
    },
    server_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    server_app_id: {
      type: 'string',
      notNull: true,
      unique: true,
    },
    server_host: {
      type: 'string',
      notNull: true,
    },
    server_port: 'string',
    server_username: {
      type: 'string',
      notNull: true,
    },
    server_password: {
      type: 'string',
      notNull: true,
    },
    server_content_url: 'string',
  });
};

exports.down = function(db) {
  return db.dropTable('servers');
};

exports._meta = {
  "version": 3
};
