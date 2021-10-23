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

const renderDetails = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const hotel = await hotelServices.getOne(hotelId);
    const isOwner = hotel.owner == req.user._id;
    res.render('hotel/details', { isOwner, hotel: hotel.toObject() });
  } catch (error) {
    console.log(error.message);
    res.send('Error::details:: ' + error.message);
  }
};

router.get('/create', isLogged, renderCreate);
router.post('/create', isLogged, createListing);
router.get('/edit', isLogged, renderEdit);
router.get('/:id/details', isLogged, renderDetails);

module.exports = router;
