const express = require('express');
const debug = require('debug')("vizyul:routes:api:session")
const passport = require('passport');

const { createSession } = require('../../api/session');
const { tableauSignIn, insertTableauServerInfo, getTableauWorkbooksForSite } = require('../../api/tableau');
const { authenticate, requireBody } = require('../api-utils');
const ApiError = require('../../api/ApiError');

const router = express.Router()

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
  getTableauServers
});

router.post('/signin', authenticate, requireBody, (req, res, next) => {
  const { serverAppId } = req.body;
  debug(`/api/tableau/signin [serverAppId=${serverAppId}]`);
  tableauSignIn(serverAppId)
    .then((response) => {
      debug('/api/tableau/signin received', response.data);
      const session = req.session;
      const { site, user, token } = response.data.credentials;

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
      debug('/api/tableau/workbooks received', response.data);
      res.status(200).send(response.data);
    })
    .catch(err => next(err));
})

module.exports = router
