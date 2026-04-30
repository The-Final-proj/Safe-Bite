const express = require("express")
const reviewRouter = express.Router();
const {addReview, getReview, getProductReviews, updateReview, deleteReview, getUserReviews} = require("../controllers/reviewController")

// import required routes
const productRouter = require("../routes/productRoutes")
const userRouter = require("../routes/userRoutes")

userRouter.get("/:userId/reviews", getUserReviews)
prodcuctRouter.get("/:productId/reviews", getProductReviews)
prodcuctRouter.post("/:productId/reviews", addReview)
reviewRouter.get("/:reviewId", getReview)
reviewRouter.patch(":reviewId", updateReview)
reviewRouter.delete("/:reviewId")

module.exports = reviewRouter;