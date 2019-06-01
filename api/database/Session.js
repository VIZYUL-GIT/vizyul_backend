const mongoose = require('mongoose');
const { Schema } = mongoose;

const SessionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
  },
  files: Array,
}, { timestamps: true });

SessionSchema.pre('validate', (next) => {
  if (this.name 
    == undefined) {
    this.name = `Session_${new Date().toDateString()}`;
  }
});

module.exports = { 
  schema: SessionSchema, 
  User: mongoose.model('Session', SessionSchema),
};
