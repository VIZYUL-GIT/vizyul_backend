const axios = require('axios');
const uuid = require('uuid/v4');
const debug = require('debug')('vizyul:api:tableau');
const _ = require('underscore');
const moment = require('moment');

const { db, pgp, errors } = require('../db');
const ApiError = require('./ApiError');
const { success, encrypt, decrypt } = require('./util');
const { validateUuid } = require('./validate');

const TABLEAU_SERVER_VERSION = '3.4';
const TABLEAU_SERVER_PAGE_SIZE = 1;

// UTILITY FUNCTIONS
// These functions provide additional capabilities that may be shared among composable or direct handlers.

const withServer = (serverAppId, op, tag = 'with-server-scope') => {
  validateUuid(serverAppId, `Invalid application server id: ${serverAppId}`);

  return db.task(tag, (task) => new Promise((resolve, reject) => {
    task.tableau.findServerByServerAppId(serverAppId)
      .then(
        server => op(task, server),
        (err) => reject(new ApiError(400, 'Missing or invalid session id'))
      )
      .then(res => resolve(res))
      .catch(err => reject(err));
  }));
};

const apiHost = (server) => {
  const port = server.server_port ? `:${server.server_port}` : '';
  const url = `${server.server_host}${port}/api/${TABLEAU_SERVER_VERSION}`;
  return url;
}

// COMPOSABLE FUNCTIONS
// These functions may be combined within Express API handler functions. All composable functions will have an
// extra parameter, task, which is the shared database connection to be used within the composable function.
// Composable functions do not return a status: { status: ... }.

const signIn = (_task, server) => new Promise((resolve, reject) => {
  const { 
    server_host, server_port, server_username, server_password, server_content_url,
  } = server;

  const password = decrypt(server_password);
  const url = `${server_host}${server_port ? `:${server_port}` : ''}/api/${TABLEAU_SERVER_VERSION}/auth/signin`;

  debug(`signIn received`, server);
  debug('Connecting to Tableau server on ', url);

  const config = {
    method: 'post',
    url,
    data: {
      "credentials": {
        "name": server_username,
        "password": password,
        ...server_content_url && {
          "site": {
            "contentUrl": server_content_url,
          },
        },
      },
    },
    headers: {
      Accept: 'application/json'
    },
  };

  axios(config)
    .then(result => { debug('result: ', result.data); resolve(result.data); })
    .catch(err => reject(err));
});

const getPaginated = (
  token, url, responseMapper, dbfn = (dsl) => Promise.resolve(dsl), params = {},
) => new Promise((resolve,reject) => {
  console.log('typeof url', typeof url);
  const config = {
    method: 'get',
    url,
    params: {
      ...params,
      pageSize: TABLEAU_SERVER_PAGE_SIZE,
      pageNumber: 1,
    },
    headers: {
      'X-Tableau-Auth': token,
      Accept: 'application/json',
    },
  };

  axios(config)
    .then(response => {
      const { pageNumber, pageSize, totalAvailable } = response.data.pagination;

      if (totalAvailable > pageSize) {
        const range = _.range(+pageNumber + 1, Math.ceil(+totalAvailable / +pageSize) + 1);
        const pages = range.map(p => axios(Object.assign({}, config, { params: { ...config.params, pageNumber: p }})));

        return axios.all(pages)
          .then(responses => _.flatten([
            responseMapper(response.data), 
            responses.map(r => responseMapper(r.data))
          ]))
          .then(mapped => dbfn(mapped))
          .then(mapped => resolve(mapped));
      } else {
        const mapped = responseMapper(response.data);
        return dbfn(mapped).then(final => resolve(final));
      }
    })
    .catch(err => reject(err));
});

const workbooks = (_task, server, serverCredentials) => getPaginated(
  serverCredentials.token,
  `${apiHost(server)}/sites/${serverCredentials.siteId}/workbooks`,
  (data) => data.workbooks.workbook,
);

const dataSources = (task, server, session, serverCredentials) => getPaginated(
  serverCredentials.token,
  `${apiHost(server)}/sites/${serverCredentials.siteId}/datasources`,
  (data) => data.datasources.datasource,
  (sources) => task.tableau.insertServerDatasources(session, sources),
);

const datasourceConnections = (_task, server, datasourceId, serverCredentials) => new Promise((resolve, reject) => {
  const config = {
    method: 'get',
    url: `${apiHost(server)}/sites/${serverCredentials.siteId}/datasources/${datasourceId}/connections`,
    headers: {
      'X-Tableau-Auth': serverCredentials.token,
      Accept: 'application/json',
    },
  };
  axios(config)
    .then(response => { debug('datasources response -> ', response); resolve(response.data.connections.connection); })
    .catch(err => reject(err));
});

const updateDatasource = (task, server, connection, datasourceId, connectionId, serverCredentials) => new Promise((resolve, reject) => {
  const config = {
    method: 'put',
    url: `${apiHost(server)}/sites/${serverCredentials.siteId}/datasources/${datasourceId}/connections/${connectionId}`,
    headers: {
      'X-Tableau-Auth': serverCredentials.token,
      Accept: 'application/json',
    },
    data: {
      connection,
    }
  };
  axios(config)
    .then(response => {
      debug('updateDatasource response -> ', response); 
      resolve(response.data); 
    })
    .catch(err => { debug('here ->', err.response.data); reject(err); });
});

const createServerSession = (task, server, serverSessionAppId, serverSessionName) => new Promise((resolve, reject) => {
  const { user_id, server_id } = server;
  const actualSessionAppId = serverSessionAppId !== undefined ? sessionAppId : uuid();
  const actualSessionName = serverSessionName !== undefined ? sessionName : `Session_${moment().format('YYYY-MM-DD-HH-mm-ss')}`;

  console.log('createServerSession', server, serverSessionAppId, serverSessionName);

  task.tableau.insertServerSession(user_id, server_id, actualSessionAppId, actualSessionName)
    .then(({ server_session_id, server_session_app_id, server_session_name }) => resolve({
      ...server,
      serverSessionId: server_session_id,
      serverSessionAppId: server_session_app_id,
      serverSessionName: server_session_name,
    }))
    .catch(err => {
      if (err.code === '23505') { // unique_violation
        reject(new ApiError(400, 'Session ids must be unique'));
      } else {
        reject(err);
      }
    });
});


//======================================================================================================================
// Exported API functions
// The functions below may be called directly by Express API handlers
// Unless documented otherwise, all exported API handlers must return a status: { status: ... }

const insertTableauServerInfo = (
  userId, host, port, username, password, contentUrl,
) => {
  if (!host || !port || !username || !password) {
    throw new ApiError(400, 'Insufficient information provided. Please check and try again');
  }
  return new Promise((resolve, reject) => {
    db.tableau.insertTableauServerInfo(
      userId, uuid(), host, port, username, encrypt(password), contentUrl,
    )
      .then(result => resolve(success(result)))
      .catch(err => reject(err));
  });
};

const tableauSignIn = (serverAppId) => withServer(
  serverAppId,
  (task, server) => signIn(task, server).then(response => success(response)),
  'tableau-signin',
);

const getUserTableauServers = (userId) => new Promise((resolve, reject) => {
  db.tableau.findTableauServersByUserId(userId)
    .then(result => resolve(success({ 
      servers: result.map(s => ({ 
        serverId: s.server_app_id, 
        host: s.server_host, 
        contentUrl: s.server_content_url 
      })),
    })))
    .catch(err => reject(err));
});


// Server-specific functions

const getTableauWorkbooksForSite = (serverAppId, serverCredentials) => withServer(
  serverAppId,
  (task, server) => workbooks(task, server, serverCredentials).then(response => success(response)),
  'tableau-workbooks',
);

const getTableauDataSourcesForSite = (serverAppId, serverCredentials) => withServer(
  serverAppId,
  (task, server) => createServerSession(task, server)
    .then(session => dataSources(task, server, session, serverCredentials))
    .then(response => { const result = success(response); debug('response here', result); return result; }),
  'tableau-datasources',
);

const getTableauDatasourceConnections = (serverAppId, serverCredentials, datasourceId) => withServer(
  serverAppId,
  (task, server) => datasourceConnections(task, server, datasourceId, serverCredentials)
    .then(response => success(response)),
  'tableau-datasource-connections',
);

const updateTableauDatasourceConnection = (serverAppId, serverCredentials, connection, datasourceId, connectionId) => withServer(
  serverAppId,
  (task, server) => updateDatasource(task, server, connection, datasourceId, connectionId, serverCredentials)
    .then(response => success(response)),
  'tableau-update-connection',
);

module.exports = {
  getTableauDataSourcesForSite,
  getUserTableauServers,
  getTableauWorkbooksForSite, 
  insertTableauServerInfo, 
  tableauSignIn, 
  getTableauDatasourceConnections,
  updateTableauDatasourceConnection,
};
