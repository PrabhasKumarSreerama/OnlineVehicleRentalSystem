import React, { useContext, useEffect, useState } from "react";
import { createBooking, fetchUserById } from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ vehicleId }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [curUser, setCurUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const token = localStorage.getItem("token");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (user?.id) {
          const rs = await fetchUserById(user.id, token);
          console.log("fetchedUser", rs.data);
          setCurUser(rs.data);
        }
      } catch (err) {
        setError("Failed to fetch required data. Please try again.");
      }
    };

    fetchDetails();
  }, [user?.id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError("Both dates are required.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setError("End date must be later than the start date.");
      return;
    }

    const bookingData = {
      user: user?.id,
      vehicle: vehicleId,
      startDate,
      endDate,
      userEmail: curUser?.email,
    };

    console.log("bookingData", bookingData, curUser);

    setIsSubmitting(true); // Disable button during submission
    try {
      await createBooking(bookingData, token);
      setSuccess("Booking created successfully!");
      setStartDate("");
      setEndDate("");
      setError("");
    } catch (err) {
      setError("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (!curUser) {
    return (
      <p className="text-center text-4xl my-auto text-gray-800">Loading...</p>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="mb-4">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 hover:bg-gray-600 text-black rounded p-2 px-4"
        >
        <span className="text-xl font-extrabold">&#8592;</span> Go Back
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Book Your Vehicle
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            min={today}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            min={startDate || today}
            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting} // Disable button during submission
          className={`${
            isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded p-3 w-full transition duration-200`}
        >
          {isSubmitting ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
