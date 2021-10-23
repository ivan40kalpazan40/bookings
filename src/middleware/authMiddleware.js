const { SECRET, TOKEN_COOKIE_NAME } = require('../config/statics.config');
const { jwtVerify } = require('../config/util.config');
const Hotel = require('../models/Hotel');
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

exports.isLogged = function (req, res, next) {
  if (!req.user) {
    return res.redirect('/auth/login');
  }
  next();
};

exports.isGuest = function (req, res, next) {
  if (req.user) {
    return res.redirect('/');
  }
  next();
};

exports.isOwner = async function (req, res, next) {
  const hotelId = req.params.id;
  const hotel = await Hotel.findById(hotelId);
  if (hotel.isOwner(req.user._id)) {
    return next();
  }
  res.redirect('/');
};

exports.notAnOwner = async function (req, res, next) {
  const hotelId = req.params.id;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel.isOwner(req.user._id)) {
    return next();
  }
  res.redirect('/');
};
