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
  return db.createTable('server_sessions', {
    user_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
    },
    server_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
    },
    server_session_id: {
      type: 'int',
      unsigned: true,
      primaryKey: true,
      autoIncrement: true,
    },
    server_session_app_id: 'string',
    server_session_name: 'string',
  })
    .then(() => db.addForeignKey('server_sessions', 'servers', 'server_sessions_server_id_fkey', {
      user_id: 'user_id',
      server_id: 'server_id',
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }))
    .then(() => db.createTable('server_datasources', {
      user_id: {
        type: 'int',
        notNull: true,
        primaryKey: true,
      },
      server_id: {
        type: 'int',
        notNull: true,
        primaryKey: true,
      },
      server_session_id: {
        type: 'int',
        notNull: true,
        primaryKey: true,
      },
      server_datasource_id: {
        type: 'int',
        autoIncrement: true,
        primaryKey: true,
      },

      server_datasource_app_id: 'string',

      tab_project_id: 'string',
      tab_owner_id: 'string',
      tab_ds_id: 'string',
      tab_ds_name: 'string',
      tab_ds_content_url: 'string',
      tab_ds_webpage_url: 'string',
      tab_ds_description: 'string',
      tab_ds_type: 'string',
      tab_ds_created_at: 'timestamp',
      tab_ds_updated_at: 'timestamp',
      tab_ds_is_certified: 'boolean',
      tab_ds_use_remote_query_agent: 'boolean',
    })
    .then(() => db.addForeignKey('server_datasources', 'server_sessions', 'datasource_server_id_fkey', {
      user_id: 'user_id',
      server_id: 'server_id',
      server_session_id: 'server_session_id',
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }))
    .then(() => db.createTable('server_datasource_connections', {
      user_id: {
        type: 'int',
        notNull: true,
        primaryKey: true,
      },
      server_id: {
        type: 'int',
        notNull: true,
        primaryKey: true,
      },
      server_session_id: {
        type: 'int',
        notNull: true,
        primaryKey: true,
      },
      server_datasource_id: {
        type: 'int',
        notNull: true,
        primaryKey: true,
      },
      connection_id: {
        type: 'int',
        notNull: true,
        primaryKey: true,
      },

      tab_conn_id: 'string',
      tab_conn_type: 'string',
      tab_conn_server_address: 'string',
      tab_conn_server_port: 'string',
      tab_conn_username: 'string',
    }))
    .then(() => db.addForeignKey('server_datasource_connections', 'server_datasources', 'datasource_connections_datasource_id_fkey', {
      user_id: 'user_id',
      server_id: 'server_id',
      server_session_id: 'server_session_id',
      server_datasource_id: 'server_datasource_id',
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    })));
};

exports.down = function(db) {
  return db.dropTable('server_datasource_connections', { ifExists: true })
    .then(() => db.dropTable('server_datasources', { ifExists: true }))
    .then(() => db.dropTable('server_sessions', { ifExists: true }));
};

exports._meta = {
  "version": 1
};
