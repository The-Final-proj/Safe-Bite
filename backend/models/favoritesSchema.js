const mongoose = require("mongoose")

const favoritesSchema = new mongoose.Schema({
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
        }
    }]

})

module.exports = mongoose.model("Favorites", favoritesSchema)