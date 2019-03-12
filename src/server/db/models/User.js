const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: {
    required: [true, 'email required'],
    type: String,
    unique: [true, 'email already exists']
  },
  profileId: String,
  token:String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;