const express = require("express")
const reviewRouter = express.Router();
const {addReview, getReview, getProductReviews, updateReview, deleteReview, getUserReviews} = require("../controllers/reviewController")

// import required routes
const productRouter = require("../routes/productRoutes")
const userRouter = require("../routes/userRoutes")

userRouter.get("/:userId/reviews", getUserReviews)
productRouter.get("/:productId/reviews", getProductReviews)
productRouter.post("/:productId/reviews", addReview)
productRouter.post("/:userId/:productId/reviews", addReview)
reviewRouter.get("/:reviewId", getReview)
reviewRouter.patch("/:reviewId", updateReview)
reviewRouter.patch("/:userId/:reviewId", updateReview)
reviewRouter.delete("/:reviewId", deleteReview)
reviewRouter.delete("/:userId/:reviewId", deleteReview)

module.exports = reviewRouter;