import React, { useState } from 'react';
import { addReview } from '../api';

const ReviewForm = ({ vehicleId, token }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }
    const reviewData = { vehicleId, rating, comment };
    try {
      await addReview(reviewData, token);
      setSuccess('Review submitted successfully!');
      setRating(0);
      setComment('');
      setError('');
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Submit Your Review</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            min="1"
            max="5"
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Rate the vehicle"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Leave a comment"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-3 w-full hover:bg-blue-600 transition duration-200"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
