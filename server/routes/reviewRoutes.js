const express = require('express');
const { addReview, getReviews, deleteReview } = require('../controllers/reviewController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:id', verifyToken, addReview);
router.get('/', getReviews);
router.delete('/:id', verifyToken, isAdmin, deleteReview)

module.exports = router;