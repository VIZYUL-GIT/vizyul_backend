const express = require('express');
const multer = require('multer');
const debug = require('debug')("vizyul:routes:api:file")
const path = require('path');
const fs = require('fs');
const passport = require('passport');

const { logFileUpload } = require('../../api/session');
const ApiError = require('../../api/ApiError');
const { validateUuid } = require('../../api/validate');
const authenticate = require('../auth-check');

const router = express.Router()
const FILES_PATH = path.resolve(__dirname, '../../files');

const fileStorage = multer.diskStorage({
  destination: function (req, _file, cb) {
    if (!req.body.sessionAppId) {
      cb(new ApiError(400, 'Cannot upload without application session id'));
    } else {
      try {
        validateUuid(req.body.sessionAppId, `Invalid application session id: ${req.body.sessionAppId}`);

        const sessionFolder = path.resolve(FILES_PATH, req.body.sessionAppId);
        fs.mkdirSync(sessionFolder, { recursive: true });
        
        cb(null, sessionFolder);
      } catch (err) {
        cb(err);
      }
    }
  },
  filename: (_req, file, cb) => {
    cb(null,  file.originalname)
  }
});

const upload = multer({ storage: fileStorage });

// Upload a file
router.post('/up', authenticate, upload.single('file'), (req, res, next) => {
  const { sessionAppId } = req.body;
  debug(`/api/file/up [sessionAppId=${sessionAppId}]`)
  logFileUpload(sessionAppId, req.file)
    .then(response => {
      debug(`/api/file/up [response=${JSON.stringify(response)}]`);
      res.status(201).send(response);
    })
    .catch(err => next(err));
});

// router.post('/', upload.single('file'), catchError(FileCtrl.create))

// Display all file

// router.get('/', catchError(FileCtrl.getAll))

// Get Xpath in a file

// router.get('/:id', catchError(FileCtrl.getXpath))

module.exports = router
