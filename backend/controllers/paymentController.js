const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/paymentSchema");

const createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items" });
    }

    console.log("🔥 CREATE SESSION HIT");

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // create payment
    const payment = await Payment.create({
      user: req.user._id,
      amount: totalAmount,
      status: "pending",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: Number(item.quantity),
      })),

      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,

      metadata: {
        paymentId: payment._id.toString(),
      },
    });

    payment.stripeSessionId = session.id;
    await payment.save();

    res.json({ url: session.url });

  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createCheckoutSession };