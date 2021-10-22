const User = require('../models/User');
const {
  confirmPassword,
  hashPassword,
  comparePasswords,
} = require('./generalServices');

const register = async (email, username, password, rePassword) => {
  const isConfirmed = confirmPassword(password, rePassword);
  if (isConfirmed) {
    const hashed = await hashPassword(password);
    return User.create({ email, username, password: hashed });
  }
  throw new Error('You have to confirm your password!');
};

const login = async (username, password) => {
  // user exist?
  const user = await User.findOne({ username });
  if (user) {
    // check pass
    const isMatch = await comparePasswords(password, user.password);
    if (isMatch) {
      return user;
    } else {
      throw new Error('Please enter valid username and password!');
    }
  } else {
    throw new Error('Please enter valid username and password!');
  }
};

const authServices = { register, login };
module.exports = authServices;
