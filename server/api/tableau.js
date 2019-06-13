const axios = require('axios');
const uuid = require('uuid/v4');
const debug = require('debug')('vizyul:api:tableau');

const { db, errors } = require('../db');
const ApiError = require('./ApiError');
const { success, encrypt, decrypt } = require('./util');
const { validateUuid } = require('./validate');

const TABLEAU_SERVER_VERSION = '3.4';

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

  debug(`api.tableau.tableauSignin received`, server);
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
    .then(result => resolve(success(result)))
    .catch(err => reject(err));
});

const workbooks = (_task, server, serverCredentials) => new Promise((resolve, reject) => {
  debug('workbooks', server, serverCredentials);
  const port = server.server_port ? `:${server.server_port}` : '';
  const url = `${server.server_host}${port}/api/${TABLEAU_SERVER_VERSION}/sites/${serverCredentials.siteId}/workbooks`;
  const config = {
    method: 'get',
    url,
    params: {
      pageSize: 1000,
      pageNumber: 1,
    },
    headers: {
      'X-Tableau-Auth': serverCredentials.token,
      Accept: 'application/json',
    },
  }
  axios(config)
    .then(response => resolve(success(response)))
    .catch(err => reject(err));
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

const getTableauWorkbooksForSite = (serverAppId, serverCredentials) => withServer(
  serverAppId,
  (task, server) => workbooks(task, server, serverCredentials),
  'tableau-workbooks',
);

module.exports = { insertTableauServerInfo, tableauSignIn, getTableauWorkbooksForSite };
