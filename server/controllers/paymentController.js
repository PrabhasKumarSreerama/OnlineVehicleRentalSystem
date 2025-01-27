const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (req, res) => {
  const { cardNumber, expiryDate, cvv, bookingDetails } = req.body;

  const [exp_month, exp_year] = expiryDate.split('/');

  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: parseInt(exp_month),
        exp_year: parseInt(exp_year),
        cvc: cvv,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: bookingDetails.amount,
      currency: 'usd',
      payment_method: paymentMethod.id,
      confirm: true,
    });

    res.status(200).json({
      success: true,
      paymentIntent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
