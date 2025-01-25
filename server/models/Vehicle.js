const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    images: [{ type: String }],
    description: { type: String },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);