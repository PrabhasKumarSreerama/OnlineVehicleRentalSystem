import React, { useEffect, useState } from "react";
import {
  fetchBookingsByUserId,
  fetchReviewsByUserId,
  fetchVehicleById,
  deleteReview,
} from "../api";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const getUserDetails = async (userId) => {
    setLoading(true);
    try {
      const [bookingRes, reviewRes] = await Promise.all([
        fetchBookingsByUserId(userId),
        fetchReviewsByUserId(userId),
      ]);

      const bookingsWithVehicleDetails = await Promise.all(
        bookingRes.data.map(async (booking) => {
          const vehicleRes = await fetchVehicleById(booking.vehicle);
          return {
            ...booking,
            vehicleDetails: vehicleRes.data,
          };
        })
      );

      setBookings(bookingsWithVehicleDetails);
      setReviews(reviewRes.data);
    } catch (err) {
      setError("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(reviewId, token);
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (err) {
      console.error("Failed to delete review:", err.message);
    }
  };

  useEffect(() => {
    getUserDetails(userId);
  }, [userId]);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Go Back
      </button>
      <h2 className="text-2xl font-bold mb-4">User Details</h2>

      <h4 className="text-lg font-bold mt-4">Bookings</h4>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <ul className="list-disc pl-6">
          {bookings.map((booking) => (
            <li key={booking._id} className="mb-2">
              <p>
                <strong>Vehicle:</strong>{" "}
                {`${booking.vehicleDetails.make} ${booking.vehicleDetails.model}`}
              </p>
              <p>
                <strong>Booking Period:</strong>{" "}
                {`${new Date(booking.startDate).toLocaleDateString()} - ${new Date(
                  booking.endDate
                ).toLocaleDateString()}`}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
            </li>
          ))}
        </ul>
      )}

      <h4 className="text-lg font-bold mt-4">Reviews</h4>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews found.</p>
      ) : (
        <ul className="list-disc pl-6">
          {reviews.map((review) => (
            <li key={review._id} className="mb-2">
              {`Vehicle: ${review.vehicle.make} ${review.vehicle.model} | Rating: ${
                review.rating
              } | Comment: ${review.comment}`}
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="ml-2 text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDetails;
