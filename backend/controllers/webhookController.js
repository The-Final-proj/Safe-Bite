const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/paymentSchema");

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
console.log("SESSION OBJECT:", session);
console.log("SEARCHING FOR:", session.id);
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ نجاح الدفع
  if (event.type === "checkout.session.completed") {
  const session = event.data.object;

  console.log("SESSION ID:", session.id);

  const updated = await Payment.findOneAndUpdate(
    { stripeSessionId: session.id },
    { status: "paid" },
    { new: true }
  );

  console.log("UPDATED PAYMENT:", updated);
}
};

module.exports = { stripeWebhook };