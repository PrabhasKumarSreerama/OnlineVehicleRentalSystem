import React, { useEffect, useContext, useState } from "react";
import { fetchUserBookings } from "../api";
import { AuthContext } from "../context/AuthContext";
import HeaderBar from "./HeaderBar";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  console.log("user.token", user);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getBookings = async () => {
      const response = await fetchUserBookings(user?.token);
      setBookings(response.data);
    };
    if (user?.role === "user") {
      getBookings();
    }else{
      navigate('/admin')
    }
  }, [user]);

  if (!user?.token) {
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
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="text-center text-gray-600">
                You have no bookings yet.
              </p>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white border rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
                >
                  <p className="text-lg font-semibold text-gray-800">
                    Vehicle ID:{" "}
                    <span className="text-gray-600">{booking.vehicleId}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    Start Date:{" "}
                    <span className="text-gray-600">{booking.startDate}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    End Date:{" "}
                    <span className="text-gray-600">{booking.endDate}</span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
