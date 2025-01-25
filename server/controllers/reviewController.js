const Review = require('../models/Review');

exports.addReview = async (req, res) => {
    const { user, vehicle, rating, comment } = req.body;
    try {
        const review = new Review({ user, vehicle, rating, comment });
        await review.save();
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('user vehicle');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};