const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const { user, vehicle, startDate, endDate, userEmail } = req.body; // Include userEmail in destructuring
  try {
    // Create and save the booking
    const booking = new Booking({ user, vehicle, startDate, endDate });
    const savedBooking = await booking.save(); // Save the booking to the database

    // If booking is saved successfully, send a confirmation email
    if (savedBooking) {
      const emailSubject = "Booking Confirmation";
      const emailText = `
        Thank you for booking with us!
        Vehicle: ${vehicle.make} ${vehicle.model}
        Booking Dates: ${new Date(startDate).toDateString()} - ${new Date(
        endDate
      ).toDateString()}
      `;

      await sendEmail(userEmail, emailSubject, emailText); 
    }

    res.status(201).json({ message: "Booking created successfully" });
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
