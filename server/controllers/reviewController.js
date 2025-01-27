const { mongoose } = require("mongoose");
const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  const { user, vehicle, rating, comment } = req.body;
  try {
    const review = new Review({ user, vehicle, rating, comment });
    await review.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { vehicleId, userId } = req.query;

    if (vehicleId && !mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: "Invalid vehicleId" });
    }

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const filter = {};
    if (vehicleId) filter.vehicle = vehicleId;
    if (userId) filter.user = userId;

    const reviews = await Review.find(filter).populate("user vehicle");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
