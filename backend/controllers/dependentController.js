const dependentModel = require("../models/dependentSchema")
const userModel = require("../models/userSchema")

const getDependents = async (req, res) => {
    const id = req.user?._id || req.params.id
    try {
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json("not found")
        }
        console.log(user.dependent)
        await user.populate("dependent")
        res.status(200).json(user)
    }

    catch(err) {
        res.status(500).json(err)
    }
}

const addDependent = async (req, res) => {
    const userId = req.user?._id || req.params.id
    try {
        const {name, relation} = req.body
        const member = new dependentModel({
            userId, name, relation
        })
        console.log(member)
        const saved = await member.save();
        const user = await userModel.findByIdAndUpdate(userId, {$push: {dependent: member._id}}, {new: true}).populate("dependent")
        if (!user) {
            return res.status(404).json("user not found")
        }
        res.status(201).json(user)
    }

    catch(err) {
        res.status(500).json(err)
    }
}

const removeDependent = async (req, res) => {
    const userId = req.user?._id || req.params.id
    const {memberId} = req.params
    try {
        const user = await userModel.findByIdAndUpdate(userId, {$pull: {dependent: memberId}}, {new: true}).populate("dependent")
        if (!user) {
            return res.status(404).json("user not found")
        }
        res.status(200).json(user)
    }

    catch (err) {
        res.status(500).json(err)
    }
}

const removeAll = async (req, res) => {
    const userId = req.user?._id || req.params.id
    console.log(userId);

    try {

        const user = await userModel.findByIdAndUpdate(userId, {$set: {dependent: []}}, {new: false})
        if (!user) {
            return res.status(404).json("user not found")
        }

        await Promise.all(
            user.dependent.map(elem => {
                console.log(elem.toString())
                return dependentModel.findByIdAndDelete(elem)
            })
        )
                res.status(200).json(user)
    }

    catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {getDependents, addDependent, removeDependent, removeAll}