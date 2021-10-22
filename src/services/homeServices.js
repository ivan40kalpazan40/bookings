const Hotel = require('../models/Hotel');

const getAll = () => Hotel.find({}).lean();

const homeServices = { getAll };
module.exports = homeServices;
