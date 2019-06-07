// const debug = require('debug')('vizyul:file-upload');

const { db, errors } = require('../db');

const { success } = require('./util');

// COMPOSABLE FUNCTIONS
// These functions may be combined within Express API handler functions. All composable functions will have an
// extra parameter, task, which is the shared database connection to be used within the composable function.

// composable function
// const logUpload = (task, sessionId, file) => new Promise((resolve, reject) => {
//   task.session.logUpload(sessionId, file.name)
//     .then(response => resolve(response))
//     .catch(err => reject(err));
// });

//======================================================================================================================
// Exported API functions
// The functions below may be called directly by Express API handlers

const logFileUpload = (sessionId, file) => new Promise((resolve, reject) => {
  db.session.logUpload(sessionId, file.name)
    .then(response => resolve(success(response)))
    .catch(err => reject(err));
});

// const logFileUpload = (sessionId, file) => {
//   const upload = new FileUpload({ sessionId, name: file.filename, fileType: 'image' });
//   return upload.save()
//     .then(response => { console.log('resp', response); const r = success({ response }); console.log('r', r); return r; })
//     .catch(err => { console.log('err', err); throw err; });
// }

module.exports = { logFileUpload };