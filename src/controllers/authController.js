const router = require('express').Router();
const authServices = require('../services/authServices');

const { jwtSign } = require('../config/util.config');
const { SECRET, TOKEN_COOKIE_NAME } = require('../config/statics.config');

const renderRegister = (req, res) => {
  res.render('auth/register');
};

const registerUser = async (req, res) => {
  const { email, username, password, rePassword } = req.body;

  try {
    const user = await authServices.register(
      email,
      username,
      password,
      rePassword
    );
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    res.redirect('/auth/register');
  }
};

const renderLogin = (req, res) => {
  res.render('auth/login');
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await authServices.login(username, password);
    const payload = {
      _id: user._id,
      email: user.email,
      username: user.username,
    };
    const token = await jwtSign(payload, SECRET);
    res
      .cookie(TOKEN_COOKIE_NAME, token, { httpOnly: true, maxAge: 3600000 })
      .redirect('/');
  } catch (error) {
    console.log(error.message);
    res.redirect('/auth/login');
  }
};

const logoutUser = (req, res) => {
  res.clearCookie(TOKEN_COOKIE_NAME).redirect('/');
};

router.get('/register', renderRegister);
router.get('/login', renderLogin);
router.get('/logout', logoutUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
