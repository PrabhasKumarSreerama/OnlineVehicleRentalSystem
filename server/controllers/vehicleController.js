const { default: mongoose } = require("mongoose");
const Vehicle = require("../models/Vehicle");

// Add a new vehicle
exports.addVehicle = async (req, res) => {
  const { make, model, year, pricePerDay, availability, images, description } =
    req.body;

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
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const { make, model, year, pricePerDay, availability, images, description } = req.body;

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.make = make || vehicle.make;
    vehicle.model = model || vehicle.model;
    vehicle.year = year || vehicle.year;
    vehicle.pricePerDay = pricePerDay || vehicle.pricePerDay;
    vehicle.availability =
      availability !== undefined ? availability : vehicle.availability;
    vehicle.images = images || vehicle.images;
    vehicle.description = description || vehicle.description;

    const updatedVehicle = await vehicle.save();
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update vehicle", error: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID format" });
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    await Vehicle.deleteOne({ _id: id });

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete vehicle", error: error.message });
  }
};

exports.changeAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    vehicle.availability =
      availability !== undefined ? availability : !vehicle.availability;

    const updatedVehicle = await vehicle.save();
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to change availability", error: error.message });
  }
};
