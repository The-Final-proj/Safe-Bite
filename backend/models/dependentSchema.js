const mongoose = require("mongoose")
const dependent = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {type: String, required: true},
    relation: String,
    allergies: {
        type: [{String}], default: []
    }

})

module.exports = mongoose.model("Dependent", dependent)