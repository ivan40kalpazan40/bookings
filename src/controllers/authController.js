const router = require('express').Router();
const authServices = require('../services/authServices');
const { isLogged, isGuest } = require('../middleware/authMiddleware');
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

router.get('/register', isGuest, renderRegister);
router.get('/login', isGuest, renderLogin);
router.get('/logout', isLogged, logoutUser);
router.post('/register', isGuest, registerUser);
router.post('/login', isGuest, loginUser);

module.exports = router;
