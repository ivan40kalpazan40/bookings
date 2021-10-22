const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const hotelController = require('./controllers/hotelController');

router.use(homeController);
router.use('/auth', authController);
router.use('/hotel', hotelController);
router.get('*', (req, res) => {
  res.send(`<h1>Error: ${res.locals.error}</h1>`);
});

module.exports = router;
