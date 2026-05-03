const express = require("express")
const apiRouter = express.Router()

const authentication = require("../middleware/auth")

// routes import
const userRouter = require("./userRoutes")
const productRouter = require("./productRoutes");
const supplierRouter = require("./supplierRoutes");
const uploadRouter = require("./uploadRoutes");
const reviewRouter = require("./reviewRoutes")
const cartRouter = require('./cartRoutes')
const orderRoutes = require("./orderRoutes");
const favoritesRouter = require("./favoritesRoutes")
const authorization = require("../middleware/authorizeRole")
const paymentRoutes = require("./paymentRoutes");


apiRouter.use("/reviews", reviewRouter)
apiRouter.use("/users", userRouter)
apiRouter.use("/products", productRouter);
apiRouter.use("/supplier", supplierRouter);
apiRouter.use("/upload", authentication, authorization("admin", "supplier"), uploadRouter);
apiRouter.use("/cart", authentication, authorization("user", "admin"), cartRouter)
apiRouter.use("/orders", authentication, authorization("user", "admin"), orderRoutes);
apiRouter.use("/favorites", authentication, authorization("user", "admin"), favoritesRouter)
apiRouter.use("/payment", paymentRoutes);
module.exports = apiRouter;
