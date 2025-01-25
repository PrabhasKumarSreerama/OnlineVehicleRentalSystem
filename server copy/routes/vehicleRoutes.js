const express = require('express');
const { getVehicles, addVehicle } = require('../controllers/vehicleController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getVehicles).post(protect, admin, addVehicle);

module.exports = router;
