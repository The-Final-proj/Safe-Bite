const express = require("express");
const router = express.Router();

const authentication = require("../middleware/auth");

// 🔥 import controller (اسم واحد صحيح فقط)
const {
  createCheckoutSession,
} = require("../controllers/paymentController");

// ========================= CREATE CHECKOUT SESSION
router.post(
  "/create-session",
  authentication,
  createCheckoutSession
);

module.exports = router;