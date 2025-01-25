const express = require('express');
const { createPayment } = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, createPayment);

module.exports = router;