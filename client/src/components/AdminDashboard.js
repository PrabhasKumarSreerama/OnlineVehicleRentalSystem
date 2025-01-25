import React, { useContext, useEffect, useState } from 'react';
import { fetchVehicles } from '../api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    const [vehicles, setVehicles] = useState([]);
    
    useEffect(() => {
        const getVehicles = async () => {
            const response = await fetchVehicles();
            setVehicles(response.data);
        };
        getVehicles();
    }, []);
    
    // Check if the user is logged in and is an admin
    if (!user || user.role !== 'admin') {
        return <p className="text-red-500">Access denied. Admins only.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Manage Vehicles</h1>
            <ul className="space-y-4">
                {vehicles.map(vehicle => (
                    <li key={vehicle._id} className="border rounded p-4">
                        <p>{vehicle.make} {vehicle.model}</p>
                        <p>Year: {vehicle.year}</p>
                        <p>Price per day: ${vehicle.pricePerDay}</p>
                        {/* Add buttons for editing or deleting vehicles */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;