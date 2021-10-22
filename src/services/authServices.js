const User = require('../models/User');

const register = (email, username, password, rePassword) => {
  return User.create({ email, username, password });
};

const authServices = { register };
module.exports = authServices;
