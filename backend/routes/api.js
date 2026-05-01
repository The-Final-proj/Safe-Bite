const express = require("express")
const apiRouter = express.Router()

// routes import
const userRouter = require("./userRoutes")
const productRouter = require("./productRoutes");
const supplierRouter = require("./supplierRoutes");
const uploadRouter = require("./uploadRoutes");
const reviewRouter = require("./reviewRoutes")
const cartRouter = require('./cartRoutes')
const orderRoutes = require("./orderRoutes");
const favoritesRouter = require("./favoritesRoutes")

apiRouter.use("/reviews", reviewRouter)
apiRouter.use("/users", userRouter)
apiRouter.use("/products", productRouter);
apiRouter.use("/supplier", supplierRouter);
apiRouter.use("/upload", uploadRouter);
apiRouter.use("/cart", cartRouter)
apiRouter.use("/orders", orderRoutes);
apiRouter.use("/favorites", favoritesRouter)

module.exports = apiRouter;
