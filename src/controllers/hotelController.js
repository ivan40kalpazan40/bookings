const router = require('express').Router();
const hotelServices = require('../services/hotelServices');
const {
  isLogged,
  isGuest,
  isOwner,
  notAnOwner,
} = require('../middleware/authMiddleware');

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

const renderDetails = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const hotel = await hotelServices.getOne(hotelId);
    const isOwner = await hotel.isOwner(req.user._id);
    const booked = await hotel.youBooked(req.user._id);
    res.render('hotel/details', { isOwner, booked, hotel: hotel.toObject() });
  } catch (error) {
    console.log(error.message);
    res.send('Error::details:: ' + error.message);
  }
};

const renderEdit = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const hotel = await hotelServices.getOne(hotelId);

    res.render('hotel/edit', { hotel: hotel.toObject() });
  } catch (error) {
    console.log(error.message);
    res.send('Error::edit:: ' + error.message);
  }
};

const editListing = async (req, res) => {
  const hotelId = req.params.id;
  const formData = { ...req.body };
  try {
    await hotelServices.update(hotelId, formData);
    res.redirect(`/hotel/${hotelId}/details`);
  } catch (error) {
    console.log(error.message);
    res.send('Error::edit:: ' + error.message);
  }
};

const deleteListing = async (req, res) => {
  const hotelId = req.params.id;
  try {
    await hotelServices.deleteHotel(hotelId);
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    res.send('Error::delete:: ' + error.message);
  }
};
const bookListing = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const hotel = await hotelServices.getOne(hotelId);
    await hotel.book(req.user);
    res.redirect(`/hotel/${hotelId}/details`);
  } catch (error) {
    console.log(error.message);
    res.send('Error::book:: ' + error.message);
  }
};

router.get('/create', isLogged, renderCreate);
router.post('/create', isLogged, createListing);
router.get('/:id/edit', isLogged, isOwner, renderEdit);
router.post('/:id/edit', isLogged, isOwner, editListing);
router.get('/:id/delete', isLogged, isOwner, deleteListing);
router.get('/:id/details', isLogged, renderDetails);
router.get('/:id/book', isLogged, notAnOwner, bookListing);

module.exports = router;
