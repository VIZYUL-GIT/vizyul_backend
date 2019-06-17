const sql = require('../sql').tableau;
const uuid = require('uuid/v4');

const { getOne, getManyOrNone } = require('../db-utils');

function TableauRepository(db, pgp) {
  this.db = db;
  this.pgp = pgp;

  this.serverDatasourceTableName = new this.pgp.helpers.TableName('server_datasources', 'webapp');
  
  this.serverDatasourceColumnSet = new this.pgp.helpers.ColumnSet([
    'user_id', 
    'server_id',
    'server_session_id',
    'server_datasource_app_id',
    'tab_project_id',
    'tab_owner_id',
    'tab_ds_id',
    'tab_ds_name',
    'tab_ds_content_url',
    'tab_ds_webpage_url',
    'tab_ds_description',
    'tab_ds_type',
    'tab_ds_created_at',
    'tab_ds_updated_at',
    'tab_ds_is_certified',
    'tab_ds_use_remote_query_agent',
  ], { table: this.serverDatasourceTableName });

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

  this.insertServerSession = getOne(
    this.db,
    sql.insertServerSession,
    'insertServerSession',
    'userId',
    'serverId',
    'serverSessionAppId',
    'serverSessionName',
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

  this.insertServerDatasources = (session, sources) => {
    console.log('insertServerDatasources', session, sources);
    const values = sources.map(source => ({
      user_id: session.user_id,
      server_id: session.server_id,
      server_session_id: session.serverSessionId,
      server_datasource_app_id: uuid(),
      tab_project_id: source.project.id,
      tab_owner_id: source.owner.id,
      tab_ds_id: source.id,
      tab_ds_name: source.name,
      tab_ds_content_url: source.contentUrl,
      tab_ds_webpage_url: source.webpageUrl,
      tab_ds_description: source.description,
      tab_ds_type: source.type,
      tab_ds_created_at: source.createdAt,
      tab_ds_updated_at: source.updatedAt,
      tab_ds_is_certified: source.isCertified,
      tab_ds_use_remote_query_agent: source.useRemoteQueryAgent,
    }));

    const query = pgp.helpers.insert(
      values, 
      this.serverDatasourceColumnSet
    ) + " RETURNING server_datasource_app_id";

    return db.many(query)
      .then(ids => {
        console.log('ids', ids);
        return sources.map((s, index) => ({ ...s, ...ids[index] }));
      });
  }
}


module.exports = TableauRepository;