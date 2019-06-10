const debug = require('debug')('vizyul:db:util');

const ApiError = require('../api/ApiError');

function callDb(dbfn, sql, name, ...argnames) {
  return (...args) =>  {
    const callArgs = args;
    debug(`starting call to ${name} using ${[callArgs]}`);
    return dbfn.apply(null, [sql, callArgs])
      .then(
        response => {
          debug(`call to ${name} resulted in `, response);
          return response;
        },
        error => {
          debug(`call to ${name} resulted in `, error);
          throw error;
        },
      );
  };
}

function getOne(db, sql, name, ...argnames) {
  return callDb(db.one, sql, name, argnames);
}

function getResult(db, sql, name, ...argnames) {
  return callDb(db.result, sql, name, argnames);
}

module.exports = { getOne, getResult };
