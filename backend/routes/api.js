const express = require("express")
const apiRouter = express.Router()

// routes import
const userRouter = require("./userRoutes")
const productRouter = require("./productRoutes");
const supplierRouter = require("./supplierRoutes");
const uploadRouter = require("./uploadRoutes");
const cartRouter = require('./cartRoutes')

apiRouter.use("/users", userRouter)
apiRouter.use("/products", productRouter);
apiRouter.use("/supplier", supplierRouter);
apiRouter.use("/upload", uploadRouter);
apiRouter.use("/cart", cartRouter)

module.exports = apiRouter;
