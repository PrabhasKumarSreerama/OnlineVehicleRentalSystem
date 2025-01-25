const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, createBooking);
router.get('/', verifyToken, getBookings);

module.exports = router;