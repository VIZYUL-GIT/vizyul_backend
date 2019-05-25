const debug = require('debug')('vizyul:file-upload');
const { FileUpload } = require('./database/Upload');

const updateOptions = {
  upsert: true,
  setDefaultsOnInsert: true,
  runValidators: true,
};

const logFileUpload = (file) => {
  const upload = new FileUpload({ name: file.filename, fileType: 'image' });
  return upload.save()
    .then(resp => { console.log('resp', resp); return resp; })
    .catch(err => { console.log('err', err); throw err; });
}

module.exports = { logFileUpload };