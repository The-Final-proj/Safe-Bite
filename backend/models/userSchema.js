const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// import required models
const dependentModel = require("./dependentSchema")

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
    dependent: [{
        member: mongoose.Schema.Types.ObjectId
    }]
})

userSchema.pre("save", async function(){
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.post("save", async function() {
    try {
        this.dependent = []
        await this.save()
    }

    catch(err) {
        console.log(err)
        throw err
    }
})

module.exports = mongoose.model("User", userSchema)