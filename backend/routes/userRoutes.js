const express = require("express")
const userRouter = express.Router();
const {register, login, getUserData, getUsers, updateUser} = require("../controllers/userController")

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/profile", getUserData) //user accessing their own profile
userRouter.get("/profile/:id", getUserData) //admin accessing user profile
userRouter.get("/", getUsers)
userRouter.patch("/profile", updateUser)
userRouter.patch("/profile/:id", updateUser)

module.exports = userRouter;
