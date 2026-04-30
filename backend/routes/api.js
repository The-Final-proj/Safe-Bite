const express = require("express")
const apiRouter = express.Router()

// routes import
const userRouter = require("./userRoutes")
const productRouter = require("./productRoutes");
const supplierRouter = require("./supplierRoutes");
const uploadRouter = require("./uploadRoutes");
const orderRoutes = require("./orderRoutes");


apiRouter.use("/users", userRouter)
apiRouter.use("/products", productRouter);
apiRouter.use("/supplier", supplierRouter);
apiRouter.use("/upload", uploadRouter);
apiRouter.use("/orders", orderRoutes);
module.exports = apiRouter;