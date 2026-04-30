const express = require("express")
const dependentRouter = express.Router()
const {getDependents, addDependent, removeDependent, removeAll} = require("../controllers/dependentController")

dependentRouter.get("/", getDependents)
dependentRouter.get("/:id", getDependents) // for admin control
dependentRouter.patch("/", addDependent)
dependentRouter.patch("/:id", addDependent) // for admin control
dependentRouter.patch("/", removeDependent) //
dependentRouter.patch("/:id/memberId", removeDependent) // for admin control
dependentRouter.patch("/", removeAll)
dependentRouter.patch("/:id", removeAll) // for admin control

module.exports = dependentRouter