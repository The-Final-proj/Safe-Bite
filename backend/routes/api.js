const express = require("express")
const apiRouter = express.Router()

// routes import
const userRouter = require("./userRoutes")

apiRouter.use("/users", userRouter)

module.exports = apiRouter