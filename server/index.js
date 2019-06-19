require('dotenv').config();

const express = require("express");
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const debug = require('debug')('vizyul:server');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const ApiError = require('./api/ApiError');
const configurePassport = require('./config/passport');

const { db, errors } = require('./db');

const HTTP_SERVER_ERROR = 500;

// require('./api/database/db'); // Handles the Mongoose connections for the entire app...

process.on('unhandledRejection', (reason, promise) => {
  console.log('====== CAUGHT UNHANDLED PROMISE REJECTION');
  console.log('  Uncaught promise reason: ', reason);
  console.log('  Promise', promise);
});

const app = express();

configurePassport(passport);

// TODO Implement CSP via Helmet

const sessionConfig = {
  store: new pgSession({
    pgPromise: db,
    schemaName: 'webapp',
    tableName: 'user_sessions',
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  cookie: { maxAge: 60 * 60 * 1000 }, // 1 hr
  saveUninitialized: false,
};

// Use secure session cookies in production only

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}


// EXPRESS STACK CONFIGURATION

app
  .use(helmet())
  .disable('x-powered-by')
  .use(cors())
  .use(compression())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(logger('dev'))
  .use(express.json({ limit: '50mb' }))
  .use(express.urlencoded({ extended: false, limit: '50mb' }))
  .use(cookieParser())
  .use(session(sessionConfig))
  .use(passport.initialize())
  .use(passport.session())

  // UTILITY MIDDLEWARE

  .use((req, res, next) => {
    // After successful login, redirect back to the intended page
    if (!req.user
      && req.path !== '/login'
      && req.path !== '/signup'
      && !req.path.match(/^\/auth/)
      && !req.path.match(/\./)) {
      req.session.returnTo = req.originalUrl;
    } else if (req.user
      && (req.path === '/account' || req.path.match(/^\/api/))) {
      req.session.returnTo = req.originalUrl;
    }
    next();
  })

  // ROUTE AND STATIC CONTENT HANDLERS

  .use(express.static(path.join(__dirname, 'client/build'))) // CRA-generated files
  .use('/api', apiRouter)
  .use('/auth', authRouter)

  // GLOBAL ERROR HANDLER

  .use((err, _req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    if (err instanceof ApiError) {
      debug(`ApiError: status=${err.status}, message="${err.message}, trace=${err.stack}"`);
      res.status(err.status).json({ status: false, message: err.message });
    } else if (err.isAxiosError && err.response) {
      // The server provided a response
      if (err.response) {
        res.status(err.status || HTTP_SERVER_ERROR).json(err.response.data);
      } else {
        debug("Other error occurred", err, err.stack);
        res.status(err.status || HTTP_SERVER_ERROR).json({ status: false, error: err.message });
      }
    }
  });

module.exports = { app, passport };