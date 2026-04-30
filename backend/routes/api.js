const express = require("express")
const apiRouter = express.Router()

// routes import
const userRouter = require("./userRoutes")
<<<<<<< HEAD
const reviewRouter = require("./reviewRoutes")

apiRouter.use("/users", userRouter)
apiRouter.use("/reviews", reviewRouter)

module.exports = apiRouter
=======
const productRouter = require("./productRoutes");
const supplierRouter = require("./supplierRoutes");
const uploadRouter = require("./uploadRoutes");

apiRouter.use("/users", userRouter)
apiRouter.use("/products", productRouter);
apiRouter.use("/supplier", supplierRouter);
apiRouter.use("/upload", uploadRouter);
module.exports = apiRouter;
>>>>>>> 411ac761495d1db01ef412e5257d10a2eba2ce64
