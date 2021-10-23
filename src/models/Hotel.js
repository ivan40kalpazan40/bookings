const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  image: { type: String, required: true },
  freeRooms: { type: Number, required: true, min: 1, max: 100 },
  tenants: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  owner: { type: mongoose.Types.ObjectId, ref: 'User' },
});

hotelSchema.method('isOwner', function (userId) {
  return this.owner == userId;
});

hotelSchema.method('youBooked', function (userId) {
  return this.tenants.includes(userId);
});
const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;
