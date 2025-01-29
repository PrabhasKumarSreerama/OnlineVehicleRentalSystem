import React, { useEffect, useContext, useState } from "react";
import { fetchUserBookings } from "../api";
import { AuthContext } from "../context/AuthContext";
import HeaderBar from "./HeaderBar";
import { useNavigate } from "react-router-dom";
import DummyCar from "../assets/images/DummyCar.jpg";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetchUserBookings(token);
        const userBookings = response.data.filter(
          (booking) => booking?.user?._id === user?.id
        );
        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false); 
      }
    };

    if (user?.role === "user") {
      getBookings();
    }
  }, [user, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-gray-700 text-lg">Loading booking records...</div>
      </div>
    );
  }

  return (
    <>
      <HeaderBar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Your Bookings
          </h1>
          <div>
            {bookings.length === 0 ? (
              <p className="text-center text-gray-600 col-span-full">
                You have no bookings yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-white border rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
                  >
                    <div className="flex flex-col">
                      <div className="w-full mb-4 md:mb-0">
                        <img
                          src={booking.vehicle.images[0] || DummyCar}
                          alt={`${booking.vehicle.make} ${booking.vehicle.model}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-full md:pl-4">
                        <p className="text-lg font-semibold text-gray-800">
                          <span className="font-bold">Vehicle: </span>
                          {booking.vehicle.make} {booking.vehicle.model}
                        </p>
                        <p className="text-base font-semibold text-gray-800">
                          <span className="text-lg font-bold">Booking Dates: </span>
                          {new Date(
                            booking.startDate
                          ).toLocaleDateString()} -{" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                          <span className="font-bold">Total Cost: </span>$
                          {booking.totalCost}
                        </p>
                        <p
                          className={`mt-2 font-semibold ${
                            booking.status === "confirmed"
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        >
                          Status: {booking.status}
                        </p>
                        <button
                          onClick={() => navigate(`/addreview/${booking._id}`)}
                          className="mt-4 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                          Add Review
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/vehicles/reviews/${booking.vehicle._id}`)
                          }
                          className="mt-4 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                          See Other Reviews
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
