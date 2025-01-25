import React, { useState, useContext } from 'react';
import { addVehicle } from '../api'; // Make sure to create this API function
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddVehicle = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [availability, setAvailability] = useState(true);
    const [images, setImages] = useState(['']); // Array for image URLs
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const vehicleData = { make, model, year, pricePerDay, availability, images, description };
    const token = localStorage.getItem("token");
        
        try {
            await addVehicle(vehicleData, token); 
            navigate('/');
        } catch (err) {
            setError('Failed to add vehicle. Please try again.');
        }
    };
    
    // Check if the user is an admin
    if (!user || user.role !== 'admin') {
        return <p className="text-red-500">Access denied. Admins only.</p>;
    }
    
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Vehicle</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required placeholder="Make" className="border rounded p-2 w-full" />
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required placeholder="Model" className="border rounded p-2 w-full" />
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required placeholder="Year" className="border rounded p-2 w-full" />
                <input type="number" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} required placeholder="Price Per Day" className="border rounded p-2 w-full" />
                <label>
                    <input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
                    Available
                </label>
                <input type="text" value={images[0]} onChange={(e) => setImages([e.target.value])} placeholder="Image URL" className="border rounded p-2 w-full" />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border rounded p-2 w-full" />
                <button type="submit" className="bg-blue-500 text-white rounded p-2">Add Vehicle</button>
            </form>
        </div>
    );
};

export default AddVehicle;