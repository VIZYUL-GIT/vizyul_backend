const debug = require('debug')('vizyul:db:util');

const ApiError = require('../api/ApiError');

function callDb(dbfn, sql, name, ...argnames) {
  if(typeof dbfn !== 'function') {
    throw new ApiError(400, 'Expected a database function to be supplied');
  }
  if (!sql) {
    throw new ApiError(400, `Invalid SQL query specified: ${sql}`);
  }
  if (!name) {
    throw new ApiError(400, `Invalid function name specified: ${name}`);
  }

  return (...args) =>  {
    const callArgs = args;
    debug(`starting sql call '${sql}' to ${name} using ${[callArgs]}`);
    return dbfn.apply(null, [sql, callArgs])
      .then(
        response => {
          debug(`sql call to ${name} resulted in `, response);
          return response;
        },
        error => {
          debug(`sql call to ${name} resulted in `, error);
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

function getManyOrNone(db, sql, name, ...argnames) {
  return callDb(db.manyOrNone, sql, name, argnames);
}

function getNone(db, sql, name, ...argnames) {
  return callDb(db.none, sql, name, argnames);
}

module.exports = { getOne, getResult, getManyOrNone, getNone };
