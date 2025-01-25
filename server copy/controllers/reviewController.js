const Review = require('../models/Review');
const Vehicle = require('../models/Vehicle');

export const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { vehicleId } = req.params;

  try {
    // Check if the user has already reviewed the vehicle
    const existingReview = await Review.findOne({
      user: req.user._id,
      vehicle: vehicleId,
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this vehicle.' });
    }

    // Create a new review
    const review = await Review.create({
      user: req.user._id,
      vehicle: vehicleId,
      rating,
      comment,
    });

    // Update the vehicle's average rating and number of reviews
    const vehicle = await Vehicle.findById(vehicleId);

    if (vehicle) {
      vehicle.numReviews += 1;
      vehicle.averageRating =
        (vehicle.averageRating * (vehicle.numReviews - 1) + rating) / vehicle.numReviews;

      await vehicle.save();
    }

    res.status(201).json({
      message: 'Review added successfully.',
      review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsForVehicle = async (req, res) => {
    const { vehicleId } = req.params;
  
    try {
      // Fetch all reviews for the given vehicle
      const reviews = await Review.find({ vehicle: vehicleId })
        .populate('user', 'name')
        .sort('-createdAt');
  
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  