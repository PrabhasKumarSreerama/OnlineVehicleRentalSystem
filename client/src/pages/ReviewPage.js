import React, { useEffect, useState } from "react";
import { fetchReviewsByVehicleId } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ReviewPage = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetchReviewsByVehicleId(id);
        console.log("vehicleId", id, response.data);
        if (response?.data) {
          const sortedReviews = response.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setReviews(sortedReviews);
          setError("");
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to fetch reviews. Please try again later.");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
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
      ) : reviews?.length === 0 ? (
        <p className="text-center text-gray-600">No reviews available.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow rounded-lg p-4 border"
            >
              <p className="text-sm text-gray-500">
                <span className="font-medium">Reviewer:</span>{" "}
                {review.user.name || "Anonymous"}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Email:</span>{" "}
                {review.user.email ? (
                  <a
                    href={`mailto:${review.user.email}`}
                    className="text-blue-500 underline"
                  >
                    {review.user.email}
                  </a>
                ) : (
                  "Not Available"
                )}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Rating:</span> {review.rating}/5
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Date:</span>{" "}
                {review.createdAt
                  ? format(new Date(review.createdAt), "MMMM dd, yyyy")
                  : "Unknown"}
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
