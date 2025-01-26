import React, { useContext, useEffect, useState } from "react";
import { fetchVehicles } from "../api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const VehicleList = () => {
  const { user } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const getVehicles = async () => {
      const response = await fetchVehicles();
      setVehicles(response.data);
    };
    getVehicles();
  }, []);

  const availableVehicles = vehicles.filter((vehicle) => vehicle.availability);

  return (
    <>
      {availableVehicles.length === 0 ? (
        <p className="text-gray-500 text-center text-3xl">
          Currently no vehicles available, please check after some time.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {availableVehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white border rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={
                  vehicle.images?.[0] ||
                  "https://images.freeimages.com/images/large-previews/b5c/red-car-3-1312639.jpg?fmt=webp&w=500"
                }
                alt={vehicle.make}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {vehicle.make} {vehicle.model}
                </h2>
                <p className="text-gray-600">Year: {vehicle.year}</p>
                <p className="text-gray-600">
                  Price per day: ${vehicle.pricePerDay}
                </p>
                <Link
                  to={`/vehicles/${vehicle._id}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  {user?.role !== "admin" ? "View Details" : ""}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default VehicleList;
