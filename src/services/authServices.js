const User = require('../models/User');
const { confirmPassword, hashPassword } = require('./generalServices');

const register = async (email, username, password, rePassword) => {
  const isConfirmed = confirmPassword(password, rePassword);
  if (isConfirmed) {
    const hashed = await hashPassword(password);
    return User.create({ email, username, password: hashed });
  }
  throw new Error('You have to confirm your password!');
};

const authServices = { register };
module.exports = authServices;
