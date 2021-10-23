const Hotel = require('../models/Hotel');

const createHotel = (hotel) => {
  return Hotel.create(hotel);
};

const getOne = (id) => Hotel.findById(id);

const hotelServices = { createHotel, getOne };
module.exports = hotelServices;
