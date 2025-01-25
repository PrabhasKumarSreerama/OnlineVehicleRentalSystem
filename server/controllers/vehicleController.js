const Vehicle = require('../models/Vehicle');

// Add a new vehicle
exports.addVehicle = async (req, res) => {
    const { make, model, year, pricePerDay, availability, images, description } = req.body;

    const newVehicle = new Vehicle({
        make,
        model,
        year,
        pricePerDay,
        availability,
        images,
        description,
    });

    try {
        const savedVehicle = await newVehicle.save();
        res.status(201).json(savedVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.fetchVehicleById = async (req, res) => {
    const { id } = req.params; 
    try {
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};