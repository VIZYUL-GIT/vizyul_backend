const debug = require('debug')('vizyul:file-upload');

const { FileUpload } = require('./database/Upload');
const { success } = require('./util');

const updateOptions = {
  upsert: true,
  setDefaultsOnInsert: true,
  runValidators: true,
};

const logFileUpload = (file) => {
  const upload = new FileUpload({ name: file.filename, fileType: 'image' });
  return upload.save()
    .then(response => { console.log('resp', response); const r = success({ response }); console.log('r', r); return r; })
    .catch(err => { console.log('err', err); throw err; });
}

module.exports = { logFileUpload };