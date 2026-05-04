require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// ======================
// Stripe Webhook (IMPORTANT - MUST BE BEFORE express.json)
// ======================
app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" })
);

// ======================
// JSON Parser
// ======================
app.use(express.json());

// ======================
// Static files
// ======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================
// DB connection
// ======================
const db = require("./models/db");

// ======================
// Routes
// ======================
const apiRouter = require("../backend/routes/api");
app.use("/api", apiRouter);

// ======================
// Error handler
// ======================
app.use(require("./middleware/errorHandler"));

// ======================
// Server
// ======================
app.listen(process.env.PORT, () => {
  console.log(`app running on port ${process.env.PORT}`);
});