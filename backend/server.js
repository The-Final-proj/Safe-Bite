require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// ======================
// Stripe Webhook (RAW BODY ONLY HERE)
// ======================
app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  require("./routes/webhookRoutes")
);

// ======================
// JSON Parser
// ======================
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// static + db
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

require("./models/db");

// API routes
const apiRouter = require("../backend/routes/api");
app.use("/api", apiRouter);

// error handler
app.use(require("./middleware/errorHandler"));

// server
app.listen(process.env.PORT, () => {
  console.log(`app running on port ${process.env.PORT}`);
});