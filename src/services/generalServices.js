const bcrypt = require('bcrypt');
exports.confirmPassword = function (password, rePassword) {
  return password === rePassword;
};

exports.hashPassword = function (password) {
  return bcrypt.hash(password, 12);
};
