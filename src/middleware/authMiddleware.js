const { SECRET, TOKEN_COOKIE_NAME } = require('../config/statics.config');
const { jwtVerify } = require('../config/util.config');
exports.auth = function (req, res, next) {
  const token = req.cookies[TOKEN_COOKIE_NAME];
  if (token) {
    //logged user
    jwtVerify(token, SECRET)
      .then((resolvedToken) => {
        req.user = resolvedToken;
        res.locals.user = resolvedToken;
        next();
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    next();
  }
};
