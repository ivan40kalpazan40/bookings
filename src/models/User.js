const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  booked: [{ type: mongoose.Types.ObjectId, ref: 'Hotel' }],
  offered: [{ type: mongoose.Types.ObjectId, ref: 'Hotel' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
