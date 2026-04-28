const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    password: {type: String, required: true},
    dependent:[{
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    }]
})

userSchema.pre("save", async function(){
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model("User", userSchema)