const express = require("express");
const apiRouter = express.Router();

const authentication = require("../middleware/auth");
const authorization = require("../middleware/authorizeRole");

// routes import
const userRouter = require("./userRoutes");
const productRouter = require("./productRoutes");
const supplierRouter = require("./supplierRoutes");
const uploadRouter = require("./uploadRoutes");
const reviewRouter = require("./reviewRoutes");
const cartRouter = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");
const favoritesRouter = require("./favoritesRoutes");
const paymentRoutes = require("./paymentRoutes");
const webhookRoutes = require("./webhookRoutes");

// =========================
// Public / normal routes
// =========================
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/supplier", supplierRouter);

// =========================
// Protected routes
// =========================
apiRouter.use(
  "/upload",
  authentication,
  authorization("admin", "supplier"),
  uploadRouter
);

apiRouter.use(
  "/cart",
  authentication,
  authorization("user", "admin"),
  cartRouter
);

apiRouter.use(
  "/orders",
  authentication,
  authorization("user", "admin"),
  orderRoutes
);

apiRouter.use(
  "/favorites",
  authentication,
  authorization("user", "admin"),
  favoritesRouter
);

// =========================
// Payment routes
// =========================
apiRouter.use("/payment", paymentRoutes);

// =========================
// Webhook route (IMPORTANT FIX)
// =========================
apiRouter.use("/payment/webhook", webhookRoutes);

module.exports = apiRouter;