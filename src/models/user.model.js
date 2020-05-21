const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {type: String, trim: true},
  email: {type: String, trim: true, required: true},
  password: {type: String, trim: true, required: true},
  fullname: {type: String, trim: true, default: ''},
  rulership: {type: Number, default: 3},
  address: {type: String, trim: true, default: ''},
  phone: {type: Number, trim: true}
});

UserSchema.methods.verifyPassword = password => {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('users', UserSchema, 'users');