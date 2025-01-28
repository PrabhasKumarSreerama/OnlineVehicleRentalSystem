const express = require('express');
const { createBooking, getBookings, getBookingsByUserId } = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, createBooking);
router.get('/', verifyToken, getBookings);
router.get('/:user', getBookingsByUserId);

module.exports = router;