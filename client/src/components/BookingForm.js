import React, { useState } from 'react';
import { createBooking } from '../api';

const BookingForm = ({ vehicleId, token }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            setError('Both dates are required.');
            return;
        }
        if (new Date(startDate) >= new Date(endDate)) {
            setError('End date must be later than the start date.');
            return;
        }

        const bookingData = { vehicleId, startDate, endDate };
        try {
            await createBooking(bookingData, token);
            setSuccess('Booking created successfully!');
            setStartDate('');
            setEndDate('');
            setError('');
        } catch (err) {
            setError('Failed to create booking. Please try again.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Book Your Vehicle</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-3 w-full hover:bg-blue-600 transition duration-200"
                >
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
