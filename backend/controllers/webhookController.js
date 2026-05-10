const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/paymentSchema");

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("🔥 WEBHOOK HIT");

    const payment = await Payment.findOne({
      stripeSessionId: session.id,
    });

    if (!payment) return res.json({ received: true });

    payment.status = "paid";
    await payment.save();

    console.log("✅ PAYMENT UPDATED TO PAID");
  }

  res.json({ received: true });
};

module.exports = { stripeWebhook };