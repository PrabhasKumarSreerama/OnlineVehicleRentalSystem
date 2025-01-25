import React, { useState } from 'react';
import { processPayment } from '../api'; // Ensure you have this API function

const PaymentPage = ({ bookingDetails, token }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const paymentData = { cardNumber, expiryDate, cvv, bookingDetails };

        try {
            await processPayment(paymentData, token); // Call the API function to process the payment
            setSuccess('Payment successful!');
            // Optionally redirect or update the UI
        } catch (err) {
            setError('Payment failed. Please try again.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Card Number:</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                        className="mt-1 border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1234 5678 9012 345 6"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date:</label>
                    <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                        className="mt-1 border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="MM/YY"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">CVV:</label>
                    <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                        className="mt-1 border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200"
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;