import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { fetchUserBookings, processPayment } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51QjNUCFCpde07NTY8Z4MfLyRY2zPpsvU4E6CVTivxKlmdluQbCsUjWd06mbaqUXt48iJwgxR9hCXBWZNl38Rjf2D00s1nq9aus"
);

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getBookings = async () => {
      const response = await fetchUserBookings(token);
      const curBooking = response.data.find((booking) => booking._id === id);
      console.log("curBooking", curBooking);
      setBookingDetails(curBooking);
    };
    if (token) {
      getBookings();
    }
  }, [token, id]);

  useEffect(() => {
    stripePromise.then((stripe) => {
      if (!stripe) {
        setError("Failed to load Stripe.");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentData = {
      cardNumber,
      expiryDate,
      cvv,
      bookingDetails,
    };

    setIsProcessing(true);

    try {
      const stripe = await stripePromise;

      if (!stripe) {
        setError("Stripe failed to load");
        return;
      }

      const response = await processPayment(paymentData, token);

      const { amount, currency } = response.data;

      const { client_secret } = response.data.paymentIntent;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: {
            card: {
              number: cardNumber,
              exp_month: expiryDate.split("/")[0],
              exp_year: expiryDate.split("/")[1],
              cvc: cvv,
            },
          },
        }
      );

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setSuccess(
          `Payment of ${amount} ${currency} successful! Check your email for confirmation.`
        );
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="mb-4 mx-4 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 hover:bg-gray-600 text-white rounded p-2 px-4"
        >
          Go Back
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Number:
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="mt-1 border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date:
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              CVV:
            </label>
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
            disabled={isProcessing}
            className={`${
              isProcessing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200`}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
