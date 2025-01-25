const express = require('express');
const { addReview, getReviews } = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, addReview);
router.get('/', getReviews);

module.exports = router;