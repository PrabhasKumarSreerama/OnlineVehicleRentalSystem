const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  pricePerDay: Number,
  location: String,
  availability: Boolean,
  description: String,
  images: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: Number,
      comment: String,
    },
  ],
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
