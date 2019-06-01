const mongoose = require('mongoose');
const { Schema } = mongoose;
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  // passwordResetToken: String,
  // passwordResetExpires: Date,

  // Secondary provider IDs and access tokens
  linkedIn: String,
  twitter: String,
  tokens: Array,

  name: {
    type: String,
    required: true,
  },
}, { timestamps: true });

UserSchema.plugin(findOrCreate);

module.exports = { 
  schema: UserSchema, 
  User: mongoose.model('User', UserSchema),
};
