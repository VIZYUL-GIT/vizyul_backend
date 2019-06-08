const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const debug = require('debug')('vizyul:api:register');
const moment = require('moment');

const { db, errors } = require('../db');
const ApiError = require('./ApiError');
const { success } = require('./util');
const { validateUuid, validatePassword, validateName, validateEmail } = require('./validate');

const QueryResultError = errors.QueryResultError;
const qrec = errors.queryResultErrorCode;

// UTILITY FUNCTIONS
// These functions provide additional capabilities that may be shared among composable or direct handlers.

const withSession = (sessionAppId, op, tag = 'with-session-scope') => {
  validateUuid(sessionAppId, `Invalid application session id: ${sessionAppId}`);

  return db.task(tag, (task) => new Promise((resolve, reject) => {
    task.session.findSessionBySessionAppId(sessionAppId)
      .then(
        session => op(task, session),
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

const fileUpload = (task, session, file) => task.session.insertFileUpload(
  session.user_id,
  session.session_id,
  uuid(),
  file.name
);

//======================================================================================================================
// Exported API functions
// The functions below may be called directly by Express API handlers
// Unless documented otherwise, all exported API handlers must return a status: { status: ... }

const createSession = (
  userId,
  sessionAppId,
  sessionName
) => {
  const actualSessionId = sessionAppId !== undefined ? sessionAppId : uuid();
  const actualSessionName = sessionName !== undefined ? sessionName : `Session_${moment().format('YYYY-MM-DD-HH-mm-ss')}`;

  return new Promise((resolve, reject) => {
    db.session.createSession(userId, actualSessionId, actualSessionName)
      .then(({ session_id, session_app_id, session_name }) => resolve(success({
        sessionId: session_id,
        sessionName: session_name,
        sessionAppId: session_app_id,
      })))
      .catch(err => {
        if (err.code === '23505') { // unique_violation
          reject(new ApiError(400, 'Session ids must be unique'));
        } else {
          reject(err);
        }
      });
  });
};

const logFileUpload = (sessionAppId, file) => withSession(
  sessionAppId, 
  (task, session) => fileUpload(task, session, file).then(response => success({ response })),
  'log-file-upload',
);

module.exports = { createSession, withSession, logFileUpload };
