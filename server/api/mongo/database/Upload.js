const mongoose = require('mongoose');

const { Schema } = mongoose;

const FileUploadSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    default: 'delete this upload',
  },
  name: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
});

module.exports = { 
  schema: FileUploadSchema, 
  FileUpload: mongoose.model('FileUpload', FileUploadSchema),
};
