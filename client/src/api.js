import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update with your backend URL

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

export const addVehicle = async (vehicleData, token) => {
  return await axios.post(`${API_URL}/vehicles`, vehicleData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateVehicle = async (vehicleId, updatedData, token) => {
  return await axios.put(`${API_URL}/vehicles/${vehicleId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteVehicle = async (vehicleId, token) => {
  return await axios.delete(`${API_URL}/vehicles/${vehicleId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const changeVehicleAvailability = async (
  vehicleId,
  availability,
  token
) => {
  return await axios.patch(
    `${API_URL}/vehicles/${vehicleId}/availability`,
    { availability },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
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

export const fetchBookingsByUserId = async (userId) => {
  return await axios.get(`${API_URL}/bookings/${userId}`);
};

export const addReview = async (bookingId, reviewData, token) => {
  return await axios.post(`${API_URL}/reviews/${bookingId}`, reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchReviewsByVehicleId = async (vehicleId) => {
  try {
    console.log("vehicleId11", vehicleId);
    const response = await axios.get(`${API_URL}/reviews`, {
      params: { vehicleId },
    });
    return response;
  } catch (error) {
    console.error("Error fetching reviews by vehicleId:", error);
    throw error;
  }
};

export const fetchReviewsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews`, {
      params: { userId },
    });
    return response;
  } catch (error) {
    console.error("Error fetching reviews by userId:", error);
    throw error;
  }
};

export const fetchReviewsByVehicleAndUser = async (vehicleId, userId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews`, {
      params: { vehicleId, userId },
    });
    return response;
  } catch (error) {
    console.error("Error fetching reviews by vehicleId and userId:", error);
    throw error;
  }
};

export const fetchAllReviews = async () => {
  try {
    const response = await axios.get(`${API_URL}/reviews`);
    return response;
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    throw error;
  }
};

export const deleteReview  = async (id, token) => {
  return await axios.delete(`${API_URL}/reviews/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const processPayment = async (paymentData, token) => {
  return await axios.post(`${API_URL}/payments`, paymentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchUsers = async (token) => {
  return await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchUserById = async (id, token) => {
  return await axios.get(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteUser = async (id, token) => {
  return await axios.delete(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
