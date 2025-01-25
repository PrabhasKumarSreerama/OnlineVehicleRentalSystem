const express = require('express');
const { bookVehicle, getUserBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, bookVehicle);
router.route('/mybookings').get(protect, getUserBookings);

module.exports = router;
