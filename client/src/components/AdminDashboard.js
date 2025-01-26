import React, { useContext, useEffect, useState } from "react";
import {
  changeVehicleAvailability,
  deleteVehicle,
  fetchVehicles,
} from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const getVehicles = async () => {
    setLoading(true);
    try {
      const response = await fetchVehicles();
      setVehicles(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError("Failed to fetch vehicles.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id, token);
      getVehicles();
    } catch (err) {
      console.error("Failed to delete vehicle:", err.message);
    }
  };

  const handleChangeAvailability = async (id, currentAvailability) => {
    try {
      await changeVehicleAvailability(id, !currentAvailability, token);
      getVehicles();
    } catch (err) {
      console.error("Failed to change availability:", err.message);
    }
  };

  if (!user || user.role !== "admin") {
    return <p className="text-red-500">Access denied. Admins only.</p>;
  }

  if (loading) {
    return <p>Loading vehicles...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Vehicle List</h2>
      {vehicles.length === 0 ? (
        <p className="text-gray-500">
          No vehicles available. Add a new vehicle to get started.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-4 text-center text-sm sm:text-base">
                  Name
                </th>
                <th className="py-2 px-4 text-center text-sm sm:text-base">
                  Model
                </th>
                <th className="py-2 px-4 text-center text-sm sm:text-base">
                  Year
                </th>
                <th className="py-2 px-4 text-center text-sm sm:text-base">
                  Price Per Day
                </th>
                <th className="py-2 px-4 text-center text-sm sm:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle._id}
                  className="border-b hover:bg-gray-100 text-sm sm:text-base"
                >
                  <td className="py-2 px-4 text-center">{vehicle.make}</td>
                  <td className="py-2 px-4 text-center">{vehicle.model}</td>
                  <td className="py-2 px-4 text-center">{vehicle.year}</td>
                  <td className="py-2 px-4 text-center">
                    ${vehicle.pricePerDay}
                  </td>
                  <td className="py-2 px-4 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row justify-center items-center">
                    <button
                      onClick={() =>
                        handleChangeAvailability(vehicle._id, vehicle.availability)
                      }
                      className={`px-3 py-1 rounded ${
                        vehicle.availability
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {vehicle.availability ? "Set Unavailable" : "Set Available"}
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/updatevehicle/${vehicle._id}`)
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
