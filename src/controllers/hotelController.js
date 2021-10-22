const router = require('express').Router();
const hotelServices = require('../services/hotelServices');
const { isLogged, isGuest } = require('../middleware/authMiddleware');
const { createCollection } = require('../models/Hotel');

const renderCreate = (req, res) => {
  res.render('hotel/create');
};

const createListing = async (req, res) => {
  const { name, city, freeRooms, image } = req.body;
  const owner = req.user;
  try {
    const hotel = await hotelServices.createHotel({
      name,
      city,
      freeRooms,
      image,
      owner,
    });
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    res.send('Error::create:: ' + error.message);
  }
};

const renderEdit = (req, res) => {
  res.render('hotel/edit');
};

router.get('/create', isLogged, renderCreate);
router.post('/create', isLogged, createListing);
router.get('/edit', isLogged, renderEdit);

module.exports = router;
