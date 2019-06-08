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
  return db.createTable('users', {
    user_id: {
      type: 'int',
      unsigned: true,
      primaryKey: true,
      autoIncrement: true
    },
    user_app_id: { 
      type: 'string',
      unique: true,
    },
    user_name: { 
      type: 'string', 
      length: 150, 
    },
    user_email: { 
      type: 'string', 
      length: 250, 
      unique: true, 
    },
    user_password: { 
      type: 'string', 
      length: 250, 
    },
  })
    .then(() => db.createTable('sessions', {
      user_id: {
        type: 'int',
        unsigned: true,
        primaryKey: true,
        notNull: true,
        foreignKey: {
          name: 'session_user_id_fkey',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'user_id',
        }
      },
      session_id: { 
        type: 'int', 
        unsigned: true,
        primaryKey: true, 
        autoIncrement: true,
      },
      session_app_id: {
        type: 'string',
        unique: true,
      },
      session_name: 'string',
    }))
    .then(() => db.createTable('uploads', {
      user_id: {
        type: 'int',
        unsigned: true,
        primaryKey: true,
      },
      session_id: {
        type: 'int',
        unsigned: true,
        primaryKey: true,
      },
      upload_app_id: {
        type: 'string',
        unique: true,
      },
      upload_id: {
        type: 'int',
        unsigned: true,
        primaryKey: true,
        autoIncrement: true,
      },
      upload_file_name: 'string',
    }))
    .then(() => db.addForeignKey(
      'uploads',
      'sessions',
      'uploads_session_user_id_fkey',
      {
        user_id: 'user_id',
        session_id: 'session_id',
      },
      {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      }
    ));
};

exports.down = function(db) {
  return db.dropTable('uploads')
    .then(() => db.dropTable('sessions'))
    .then(() => db.dropTable('users'));
};

exports._meta = {
  "version": 1
};
