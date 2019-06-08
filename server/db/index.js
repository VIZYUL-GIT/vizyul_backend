const monitor = require('pg-monitor');
const debug = require('debug')('ca:db')

const repos = require('./repos');

const initOptions = {
  extend(obj, dc) {
    // Add other repositories here as they are defined
    obj.user = new repos.User(obj, pgp);
    obj.auth = new repos.Auth(obj, pgp);
    obj.session = new repos.Session(obj, pgp);
  }
}
const pgp = require('pg-promise')(initOptions);

const errors = pgp.errors;

monitor.attach(initOptions);
debug('PostgreSQL monitoring set up');

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_BASE_NAME = process.env.DB_BASE_NAME;

debug(`Connecting to PG database on ${DB_HOST}`);

const connectionString = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BASE_NAME}`
const db = pgp(connectionString);

module.exports = { db, errors };