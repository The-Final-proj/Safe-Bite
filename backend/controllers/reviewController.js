const reviewModel = require("../models/reviewSchema")

const addReview = async (req, res) => { // post (product/:productId/reviews)
    const userId = req.user?._id || req.params.userId
    const {productId} = req.params
    const {rating, comment} = req.body
    try {
        const review = new reviewModel({
            user: userId, product: productId, rating, comment
        })

        const saved = await review.save();
        res.status(201).json(saved)
    }

    catch (err) {
        res.status(500).json(err)
    }
}

const getReview = async (req, res) => { // get (reviews/:reviewId)
    const reviewId = req.params.reviewId
    try {
        const review = await reviewModel.findById(reviewId).populate("user product")
        if (!review) {
            return res.status(404).json("review not found")
        }

        res.status(200).json(review)
    }

    catch (err) {
        res.status(500).json(err)
    }
}

const getProductReviews = async (req, res) => { // get (product/:productId/reviews) all reviews for a single product
    const {productId} = req.params
    console.log(productId)
    try {
        const reviews = await reviewModel.find({product: productId}).populate("user product")
        if (!reviews.length) {
            return res.status(200).json("no reviews found")
        }

        res.status(200).json(reviews)

    }

    catch (err) {
        res.status(500).json(err)
    }
}
 
const updateReview = async (req, res) => { // patch (/reviews/:reviewId)
    const {reviewId} = req.params;
    const userId = req.user?._id || req.params.userId
    try {
        const review = await reviewModel.findById(reviewId)
        if (!review) {
            return res.status(404).json("review not found")
        }

        if (review.user.toString() !== userId && req.user?.role !== "admin")
            return res.status(403).json("not authorized")

        const updated = await reviewModel.findByIdAndUpdate(reviewId, {$set: req.body}, {new: true, runValidators: true})
        res.status(200).json(updated)
    }

    catch (err) {
        res.status(500).json(err)
    }
}

const deleteReview = async (req, res) => { // delete (/reviews/:reviewId)
    const {reviewId} = req.params;
    const userId = req.user?._id || req.params.userId
    try {
        const review = await reviewModel.findById(reviewId)
        if (!review) {
            return res.status(404).json("review not found")
        }

        if (review.user.toString() !== userId && req.user?.role !== "admin") {
            return res.status(403).json("not authorized")
        }

        await review.deleteOne()
        res.status(200).json("deleted successfully")
    }

    catch (err) {
        res.status(500).json(err)
    }
}

const getUserReviews = async (req, res) => { // get (/users/:userId/reviews)
    const {userId} = req.params;
    try {
        const reviews = await reviewModel.find({user: userId}).populate("user product")
        if (!reviews.length) {
            return res.status(200).json("no reviews")
        }

        res.status(200).json(reviews)
    }

    catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {addReview, getReview, getProductReviews, updateReview, deleteReview, getUserReviews}