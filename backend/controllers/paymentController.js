const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Payment = require("../models/paymentSchema");
const Order = require("../models/orderSchema");

const createCheckoutSession = async (req, res) => {
  try {
    const { items, orderId } = req.body;

    // 🔴 validation أقوى
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    // حساب total
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // إنشاء Payment record
    const payment = await Payment.create({
      user: req.user._id,
      order: orderId,
      amount: totalAmount,
      status: "pending",
    });

    // Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),

      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL,
    });

    // ربط session بالـ payment
    payment.stripeSessionId = session.id;
    await payment.save();

    return res.status(200).json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Stripe Error:", error);

    return res.status(500).json({
      message: "Payment failed",
      error: error.message,
    });
  }
};

module.exports = { createCheckoutSession };