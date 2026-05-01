const express = require("express")
const dependentRouter = express.Router()
const {getDependents, addDependent, removeDependent, removeAll} = require("../controllers/dependentController")

dependentRouter.get("/", getDependents)
dependentRouter.get("/:id", getDependents) // for admin control
dependentRouter.patch("/add", addDependent)
dependentRouter.patch("/add/:id", addDependent) // for admin control
dependentRouter.patch("/del/:memberId", removeDependent) //
dependentRouter.patch("/del/:id/:memberId", removeDependent) // for admin control
dependentRouter.delete("/", removeAll)
dependentRouter.delete("/:id", removeAll) // for admin control

module.exports = dependentRouter