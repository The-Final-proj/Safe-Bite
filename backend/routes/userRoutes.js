const express = require("express")
const userRouter = express.Router();
const {register, login, getUserData, getUsers, updateUser} = require("../controllers/userController")

// import required routers
const dependentRouter = require("../routes/dependentRoutes");
const authorization = require("../middleware/authorizeRole");
const authentication = require("../middleware/auth")

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/profile", authentication, getUserData) //user accessing their own profile
userRouter.get("/profile/:id", authentication, authorization("admin"), getUserData) //admin accessing user profile
userRouter.get("/", authentication, authorization("admin"), getUsers)
userRouter.patch("/profile", authentication, updateUser)
userRouter.patch("/profile/:id", authentication, authorization("admin"), updateUser)

userRouter.use("/dependents", authentication, dependentRouter)

module.exports = userRouter;
