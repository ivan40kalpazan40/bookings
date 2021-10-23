const Hotel = require('../models/Hotel');

const createHotel = (hotel) => Hotel.create(hotel);

const getOne = (id) => Hotel.findById(id);
const update = (id, update) =>
  Hotel.findOneAndUpdate({ _id: id }, update, { runValidators: true });

const hotelServices = { createHotel, getOne, update };
module.exports = hotelServices;
