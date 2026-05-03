const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
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

    // ========================= PAYMENT SUCCESS
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("Payment Success:", session.id);

      // هنا تحدث MongoDB
      // مثال:
      // Payment.findOneAndUpdate({ stripeSessionId: session.id }, { status: "paid" })
    }

    res.json({ received: true });
  }
);

module.exports = router;