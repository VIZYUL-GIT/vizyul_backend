const mongoose = require('mongoose');
const { Schema } = mongoose;

const SessionSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: () => `Session_${new Date().toDateString()}`,
  },
  mode: {
    type: String,
  },
  files: Array,
}, { timestamps: true });

module.exports = { 
  schema: SessionSchema, 
  Session: mongoose.model('Session', SessionSchema),
};
