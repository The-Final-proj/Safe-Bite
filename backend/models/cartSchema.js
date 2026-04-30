const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true
    },

    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {type: Number, default: 0}
    }],

    total: {type: Number, default: 0}
})

module.exports = mongoose.model("Cart", cartSchema)