const dependentModel = require("../models/dependentSchema")
const userModel = require("../models/userSchema")

const getDependents = async (req, res) => {
    const id = req.user._id || req.params.id
    try {
        const user = userModel.findById(id)
        if (!user) {
            return res.status(404).json("not found")
        }

        res.status(200).json(user.dependent.populate("member"))
    }

    catch(err) {
        res.status(500).json(err)
    }
}

const addDependent = async (req, res) => {
    const userId = req.user._id || req.params.id
    try {
        const user = userModel.findById(userId)
        const {name, relation} = req.body
        const member = new dependentModel({
            userId, name, relation
        })
        user.dependent.push(member)
        const saved = user.save();
        res.status(201).json(saved)
    }

    catch(err) {
        res.status(500).json(err)
    }
}

const removeDependent = async (req, res) => {
    const userId = req.user._id || req.params.id
    const {memberId} = req.params
    try {
        const user = userModel.findById(userId)
        if (!user) {
            return res.status(404).json("user not found")
        }

        user.dependent = user.dependent.filter(elem=> {
            elem.toString() !== memberId
        })

        const saved = await user.save()

        res.status(200).json(saved)
    }

    catch (err) {
        res.status(500).json(err)
    }
}

const removeAll = async (req, res) => {
    const userId = req.user._id || req.params.id
    try {
        const user = userModel.findById(userId)
        if (!user) {
            return res.status(404).json("user not found")
        }

        user.dependent = []

        const saved = await user.save()
        res.status(200).json(saved)
    }

    catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {getDependents, addDependent, removeDependent, removeAll}