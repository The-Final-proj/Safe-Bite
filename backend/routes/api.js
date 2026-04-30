const express = require("express")
const apiRouter = express.Router()

// routes import
const userRouter = require("./userRoutes")
const reviewRouter = require("./reviewRoutes")

apiRouter.use("/users", userRouter)
apiRouter.use("/reviews", reviewRouter)

module.exports = apiRouter