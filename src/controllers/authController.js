const router = require('express').Router();

const renderRegister = (req, res) => {
  res.render('auth/register');
};

const renderLogin = (req, res) => {
  res.render('auth/login');
};

router.get('/register', renderRegister);
router.get('/login', renderLogin);

module.exports = router;
