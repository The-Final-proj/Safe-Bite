const mongoose = require("mongoose")
const dependent = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    relation: {type: String},
    name: {type: String, required: true}
})

module.exports = mongoose.model("Dependent", dependent)