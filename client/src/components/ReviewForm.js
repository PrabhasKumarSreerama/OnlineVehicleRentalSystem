import React, { useEffect, useState } from "react";
import { addReview, fetchUserBookings } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [curBooking, SetCurBooking] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getBookings = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetchUserBookings(token);
        const userBooking = response.data.find((booking) => booking._id === id);
        SetCurBooking(userBooking);
      } catch (err) {
        setError("Failed to fetch bookings. Please try again.");
      } finally {
        setIsLoading(false); // End loading
      }
    };

    if (token) {
      getBookings();
    }
  }, [token, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }
    const reviewData = {
      user: curBooking?.user?._id,
      vehicle: curBooking?.vehicle?._id,
      rating,
      comment,
    };
    try {
      await addReview(id, reviewData, token);
      setSuccess("Review submitted successfully!");
      setRating(0);
      setComment("");
      setError("");
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="mb-4 mx-4 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 hover:bg-gray-600 text-white rounded p-2 px-4"
        >
          Go Back
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Submit Your Review
        </h2>

        {isLoading ? (
          <p className="text-center text-blue-500 mb-4">Loading...</p> // Loading indicator
        ) : (
          <>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-center mb-4">{success}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1-5)
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
