import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

export const registerUser  = async (userData) => {
    return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser  = async (userData) => {
    return await axios.post(`${API_URL}/auth/login`, userData);
};

export const addVehicle = async (vehicleData, token) => {
    return await axios.post(`${API_URL}/vehicles`, vehicleData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const fetchVehicles = async () => {
    return await axios.get(`${API_URL}/vehicles`);
};

export const fetchVehicleById = async (id) => {
    return await axios.get(`${API_URL}/vehicles/${id}`);
};

export const createBooking = async (bookingData, token) => {
    return await axios.post(`${API_URL}/bookings`, bookingData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const fetchUserBookings = async (token) => {
    return await axios.get(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const addReview = async (reviewData, token) => {
    return await axios.post(`${API_URL}/reviews`, reviewData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const fetchReviewsByVehicleId = async (vehicleId) => {
    return await axios.get(`${API_URL}/vehicles/${vehicleId}/reviews`);
};

export const processPayment = async (paymentData, token) => {
    return await axios.post(`${API_URL}/payments`, paymentData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};