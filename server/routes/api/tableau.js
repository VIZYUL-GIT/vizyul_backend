const express = require('express');
const debug = require('debug')("vizyul:routes:api:tableau")
const passport = require('passport');

const { createSession } = require('../../api/session');
const { 
  tableauSignIn, insertTableauServerInfo, getTableauWorkbooksForSite, getUserTableauServers,
  getTableauDataSourcesForSite, getTableauDatasourceConnections, updateTableauDatasourceConnection,
  updateTableauServerInfo,
} = require('../../api/tableau');
const { authenticate, requireBody } = require('../api-utils');
const ApiError = require('../../api/ApiError');

const router = express.Router()

router.patch('/server/update', authenticate, (req, res, next) => {
  const { serverAppId, host, port, name, password, contentUrl } = req.body;
  debug('/server/update', req.body, serverAppId);
  updateTableauServerInfo(serverAppId, host, port, name, password, contentUrl)
    .then((response) => {
      debug('/api/tableau/server received', response);
      res.status(201).send(response);
    })
    .catch(err => next(err));
})

router.post('/server', authenticate, (req, res, next) => {
  const { host, port, name, password, contentUrl } = req.body;
  const { userId } = req.user;
  debug('/api/tableau/server ', req.body, req.user);
  insertTableauServerInfo(userId, host, port, name, password, contentUrl)
    .then((response) => {
      debug('/api/tableau/server received', response);
      res.status(201).send(response);
    })
    .catch(err => next(err));
});

router.get('/servers', authenticate, (req, res, next) => {
  debug('/api/tableau/servers', req.params);
  const { userId } = req.user;
  
  getUserTableauServers(userId)
    .then((response) => {
      debug('/api/tableau/servers received', response);
      res.status(200).send(response);
    })
    .catch(err => next(err));
});

router.post('/signin', authenticate, requireBody, (req, res, next) => {
  const { serverAppId } = req.body;
  debug(`/api/tableau/signin [serverAppId=${serverAppId}]`);
  tableauSignIn(serverAppId)
    .then((result) => {
      debug('/api/tableau/signin received', result);
      const session = req.session;
      const { site, user, token } = result.response.credentials;

      const serverCredentials = {
        siteId: site.id,
        userId: user.id,
        token: token,
        serverAppId: serverAppId, // so we can match back...
      };

      session.serverCredentials = serverCredentials;

      res.status(200).send({ status: true, message: 'Signin complete' });
    })
    .catch(err => next(err));
});

router.get('/workbooks', authenticate, (req, res, next) => {
  const { serverCredentials } = req.session;
  const { serverAppId } = req.query;
  debug('/api/tableau/workbooks', serverCredentials, req.query);
  if (!serverCredentials) {
    throw new ApiError(400, 'Not signed in on Tableau server');
  }
  if (!serverAppId || serverAppId !== serverCredentials.serverAppId) {
    throw new ApiError(400, 'Server App Id mismatch');
  }
  getTableauWorkbooksForSite(serverAppId, serverCredentials)
    .then((response) => {
      debug('/api/tableau/workbooks received', response);
      res.status(200).send(response);
    })
    .catch(err => next(err));
});

router.get('/datasources', authenticate, (req, res, next) => {
  const { serverCredentials } = req.session;
  const { serverAppId } = req.query;

  debug('/api/tableau/datasources', serverCredentials, req.query);
  if (!serverCredentials) {
    throw new ApiError(400, 'Not signed in on Tableau server');
  }
  if (!serverAppId || serverAppId !== serverCredentials.serverAppId) {
    throw new ApiError(400, 'Server App Id mismatch');
  }

  getTableauDataSourcesForSite(serverAppId, serverCredentials)
    .then((response) => {
      debug('/api/tableau/datasources received', response);
      res.status(200).send(response);
    })
    .catch(err => next(err));
});

router.get('/datasource/connections', authenticate, (req, res, next) => {
  const { datasourceId, serverAppId } = req.query;
  const { serverCredentials } = req.session;
  if(!serverCredentials) {
    next(new ApiError(400, 'Not signed in on Tableau server'));
  } else {
    getTableauDatasourceConnections(serverAppId, serverCredentials, datasourceId)
    .then((response) => {
      debug('here ------> ', JSON.stringify(response));
      res.status(200).send(response);
    })
    .catch(err => next(err));
  }
});

router.put('/connection', authenticate, (req, res, next) => {
  const { connection, serverAppId, datasourceId, connectionId } = req.body;
  const { serverCredentials } = req.session;
  debug('req.body===', req.body, serverAppId);
  if (!serverCredentials) {
    next(new ApiError(400, 'Not signed in on Tableau server'));
  } else {
    updateTableauDatasourceConnection(serverAppId, serverCredentials, connection, datasourceId, connectionId)
      .then((response) => {
        debug('PUT /api/tableau/connection returned', response);
        res.status(200).send(response);
      })
      .catch(err => { debug('/connection error', err); next(err); });
  }
});

router.get('/monster', authenticate, (req, res, next) => {
  const { serverCredentials } = req.session;
  const { serverAppId } = req.query;
  
  createServerSession(serverAppId)
    .then()
});

module.exports = router
