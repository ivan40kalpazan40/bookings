const util = require('util');
const jwt = require('jsonwebtoken');

exports.jwtSign = util.promisify(jwt.sign);
