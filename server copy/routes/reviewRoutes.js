const express = require('express');
const { createReview, getReviewsForVehicle } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new review
router.post('/:vehicleId', protect, createReview);

// Get all reviews for a vehicle
router.get('/:vehicleId', getReviewsForVehicle);

module.exports = router;
