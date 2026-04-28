const mongoose = require("mongoose")
const dependent = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {type: String, required: true},
    relation: String

})

module.exports = mongoose.model("Dependent", dependent)