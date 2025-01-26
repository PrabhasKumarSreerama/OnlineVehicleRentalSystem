import React, { useEffect, useState } from "react";
import { fetchReviewsByVehicleId } from "../api";
import { useParams, useNavigate } from "react-router-dom";

const ReviewPage = () => {
  const { vehicleId } = useParams(); // Get vehicleId from URL params
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetchReviewsByVehicleId(vehicleId);
        setReviews(response.data); // Assume API returns an array of reviews
        setError("");
      } catch (err) {
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [vehicleId]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="bg-gray-500 hover:bg-gray-600 text-white rounded p-2 px-4"
        >
          Go Back
        </button>
      </div>

      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Vehicle Reviews
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading reviews...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-600">No reviews available.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white shadow rounded-lg p-4 border"
            >
              <p className="text-sm text-gray-500">
                <span className="font-medium">Reviewer:</span>{" "}
                {review.reviewerName || "Anonymous"}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Rating:</span> {review.rating}/5
              </p>
              <p className="mt-2 text-gray-800">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
