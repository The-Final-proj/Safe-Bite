const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// import required models
const cartModel = require("./cartSchema")

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    role: {
        type: String, 
        enum: ["supplier", "admin", "user"],
        default: "user"
    }, 
    dependent: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dependent" }],
        default: []
    }
})

userSchema.pre("save", async function(){
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.post("save", async function() {
    try {
        const cart = await new cartModel({
            userId: this._id,
            items: []
        })

        await cart.save()
    }

    catch(err) {
        console.log(err)
        throw err
    }
})

module.exports = mongoose.model("User", userSchema)
