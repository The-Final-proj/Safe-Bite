const express = require("express")
const reviewRouter = express.Router();
const {addReview, getReview, getProductReviews, updateReview, deleteReview, getUserReviews} = require("../controllers/reviewController")

const authentication = require("../middleware/auth")

// import required routes
const productRouter = require("../routes/productRoutes")
const userRouter = require("../routes/userRoutes");
const authorization = require("../middleware/authorizeRole");

userRouter.get("/:userId/reviews", getUserReviews)
productRouter.get("/:productId/reviews", getProductReviews)
productRouter.post("/:productId/reviews", authentication, addReview)
productRouter.post("/:userId/:productId/reviews", authentication, authorization("admin"), addReview)
reviewRouter.get("/:reviewId", getReview)
reviewRouter.patch("/:reviewId", authentication, updateReview)
reviewRouter.patch("/:userId/:reviewId", authentication, authorization("admin"), updateReview)
reviewRouter.delete("/:reviewId", authentication, deleteReview)
reviewRouter.delete("/:userId/:reviewId", authentication, authorization("admin"), deleteReview)

module.exports = reviewRouter;