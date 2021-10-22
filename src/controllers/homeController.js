const router = require('express').Router();
const homeServices = require('../services/homeServices');

const getHome = async (req, res) => {
  try {
    let hotels = await homeServices.getAll();
    res.render('index', {hotels});
  } catch (error) {
    console.log(error.message);
    res.send('Error::render::' + error.message);
  }
};

router.get('/', getHome);
module.exports = router;
