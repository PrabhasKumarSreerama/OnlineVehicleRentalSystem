const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const sendEmail = require("../config/nodemailer");

exports.createBooking = async (req, res) => {
  const { user, vehicle, startDate, endDate, userEmail } = req.body;
  try {
    const vehicleDetails = await Vehicle.findById(vehicle);
    if (!vehicleDetails) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysBooked = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalCost = daysBooked * vehicleDetails.pricePerDay;

    const booking = new Booking({
      user,
      vehicle,
      startDate,
      endDate,
      totalCost,
    });
    const savedBooking = await booking.save();

    if (savedBooking) {
      const emailSubject = "BookMyRide Booking Confirmation";
      const emailText = `
        <h2 style="color: #4CAF50;">Booking Confirmation</h2>
  <p style="font-size: 16px; line-height: 1.5;">
    Dear ${userEmail},<br><br>
    Thank you for booking with us! We are excited to confirm your reservation for the vehicle listed below:
  </p>

  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <tr>
      <th style="padding: 8px; border: 1px solid #ddd; text-align: left; background-color: #f2f2f2;">Vehicle</th>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${
        vehicleDetails.make
      } ${vehicleDetails.model}</td>
    </tr>
    <tr>
      <th style="padding: 8px; border: 1px solid #ddd; text-align: left; background-color: #f2f2f2;">Booking Dates</th>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${start.toDateString()} - ${end.toDateString()}</td>
    </tr>
    <tr>
      <th style="padding: 8px; border: 1px solid #ddd; text-align: left; background-color: #f2f2f2;">Total Days</th>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${daysBooked} days</td>
    </tr>
    <tr>
      <th style="padding: 8px; border: 1px solid #ddd; text-align: left; background-color: #f2f2f2;">Total Cost</th>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">$${totalCost.toFixed(
        2
      )}</td>
    </tr>
  </table>

  <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
    We hope you enjoy your experience with our service! If you have any questions or need further assistance, please don't hesitate to reach out to us.<br><br>
    Best regards,<br>
    <strong>Your BookMyRide Vehicle Rental Team</strong><br>
    <a href="mailto:support@yourservice.com" style="color: #007BFF;">support@bookmyride.com</a>
  </p>
      `;

      await sendEmail(userEmail, emailSubject, emailText);
    }

    res.status(201).json({
      message: "Booking created successfully",
      bookingId: savedBooking._id,
      totalCost,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user vehicle");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingsByUserId = async (req, res) => {
  try {
    const { user } = req.params;
    const bookings = await Booking.find({ user });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
