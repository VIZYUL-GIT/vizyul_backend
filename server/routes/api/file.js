const express = require('express');
const multer = require('multer');
const debug = require('debug')("vizyul:routes:api:file")
const path = require('path');
const fs = require('fs');

const { logFileUpload } = require('../../api/file-upload');
const ApiError = require('../../api/ApiError');
const { validateUuid } = require('../../api/validate');

const router = express.Router()
const FILES_PATH = path.resolve(__dirname, '../../../files');

debug('Uploading to ', FILES_PATH);

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!req.body.sessionId) {
      cb(new ApiError(400, 'Cannot upload without session id'));
    } else {
      try {
        validateUuid(req.body.sessionId);

        const sessionFolder = path.resolve(FILES_PATH, req.body.sessionId);
        fs.mkdirSync(sessionFolder, { recursive: true });
        
        cb(null, sessionFolder);
      } catch (err) {
        cb(err);
      }
    }
  },
  filename: (req, file, cb) => {
    cb(null,  file.originalname)
  }
});

const upload = multer({ storage: fileStorage });

// Upload a file
router.post('/up', upload.single('file'), (req, res, next) => {
  const { sessionId } = req.body;
  logFileUpload(sessionId, req.file)
    .then(response => {
      debug('/up received', response);
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
