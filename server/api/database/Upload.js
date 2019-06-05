const mongoose = require('mongoose');

const { Schema } = mongoose;

const FileUploadSchema = new Schema({
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
