const express = require('express');
const { addVehicle, getVehicles, fetchVehicleById } = require('../controllers/vehicleController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, isAdmin, addVehicle);
router.get('/', getVehicles);
router.get('/:id', fetchVehicleById);

module.exports = router;