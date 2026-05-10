const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    amount: Number,

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    stripeSessionId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);