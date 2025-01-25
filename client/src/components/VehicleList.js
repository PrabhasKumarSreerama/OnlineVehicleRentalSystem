import React, { useEffect, useState } from 'react';
import { fetchVehicles } from '../api';
import { Link } from 'react-router-dom';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const getVehicles = async () => {
      const response = await fetchVehicles();
      setVehicles(response.data);
      console.log("vehicles", response.data);
    };
    getVehicles();
  }, []);

  const availableVehicles = vehicles.filter(vehicle => vehicle.availability);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {availableVehicles.map((vehicle) => (
        <div key={vehicle._id} className="bg-white border rounded-lg shadow-lg overflow-hidden">
          <img
            src={vehicle.images?.[0] || 'https://images.freeimages.com/images/large-previews/b5c/red-car-3-1312639.jpg?fmt=webp&w=500'}
            alt={vehicle.make}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{vehicle.make} {vehicle.model}</h2>
            <p className="text-gray-600">Year: {vehicle.year}</p>
            <p className="text-gray-600">Price per day: ${vehicle.pricePerDay}</p>
            <Link
              to={`/vehicles/${vehicle._id}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
