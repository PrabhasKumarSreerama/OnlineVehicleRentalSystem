import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchVehicleById } from "../api";
import BookingForm from "../components/BookingForm";
import DummyCar from "../assets/images/DummyCar.jpg";

const Vehicle = () => {
  const { id: vehicleId } = useParams(); // Extract 'id' from route parameters
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const getVehicle = async () => {
      try {
        const response = await fetchVehicleById(vehicleId);
        setVehicle(response.data);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      } finally {
        setLoading(false);
      }
    };
    getVehicle();
  }, [vehicleId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-gray-700 text-lg">Loading vehicle details...</div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-red-600 text-lg">
          Unable to fetch vehicle details.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg lg:ml-auto shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4 text-blue-600">
            {vehicle.make} {vehicle.model}
          </h1>
          <img
            src={vehicle.images[0] || DummyCar}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-60 object-contain rounded mb-4"
          />
          <div className="text-gray-700 space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Year:</span> {vehicle.year}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Price per day:</span> $ {vehicle.pricePerDay}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Description:</span>{" "}
              {vehicle.description || "No description available."}
            </p>
          </div>
          <button
            onClick={() => navigate(`/vehicles/reviews/${vehicleId}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2 px-4 mt-4"
          >
            See Other Reviews
          </button>
        </div>
        <div className="mt-6">
          <BookingForm vehicleId={vehicleId} />
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
