const { ENV_PATH } = require('./config/path')
require('dotenv').config({ path: ENV_PATH })

let express = require("express");
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

let indexRouter = require('./routes/index.js');

const HTTP_SERVER_ERROR = 500;

require('./api/database/db'); // Handles the Mongoose connections for the entire app...

process.on('unhandledRejection', (reason, promise) => {
    console.log('====== CAUGHT UNHANDLED PROMISE REJECTION');
    console.log('  Uncaught promise reason: ', reason);
    console.log('  Promise', promise);
  });
  
const app = express();                                                                                                                                                               

app.use(cors())
    .use(logger('dev'))
    .use(express.json({limit: '50mb'}))
    .use(express.urlencoded({ extended: false, limit: '50mb' }))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'client/build'))) // CRA-generated files
    .use('/api/v1', indexRouter)
    .use((err, req, res, next) => {
        if (res.headersSent) {
            return next(err);
        }
        res.status(err.status || HTTP_SERVER_ERROR);
    })

module.exports = app