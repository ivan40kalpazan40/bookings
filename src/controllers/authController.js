const router = require('express').Router();
const authServices = require('../services/authServices');

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
    console.log(user);
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    res.redirect('/auth/register');
  }
};

const renderLogin = (req, res) => {
  res.render('auth/login');
};

router.get('/register', renderRegister);
router.post('/register', registerUser);
router.get('/login', renderLogin);

module.exports = router;
