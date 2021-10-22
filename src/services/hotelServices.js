const Hotel = require('../models/Hotel');

const createHotel = (hotel) => {
  return Hotel.create(hotel);
};

const hotelServices = { createHotel };
module.exports = hotelServices;
