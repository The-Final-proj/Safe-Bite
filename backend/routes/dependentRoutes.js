const express = require("express")
const dependentRouter = express.Router()
const authorization = require("../middleware/authorizeRole")
const {getDependents, addDependent, removeDependent, removeAll} = require("../controllers/dependentController")

dependentRouter.get("/", authorization("user"), getDependents)
dependentRouter.get("/:id", authorization("admin"), getDependents) // for admin control
dependentRouter.patch("/add", authorization("user"), addDependent)
dependentRouter.patch("/add/:id", authorization("admin"), addDependent) // for admin control
dependentRouter.patch("/del/:memberId", authorization("user"), removeDependent) //
dependentRouter.patch("/del/:id/:memberId", authorization("admin"), removeDependent) // for admin control
dependentRouter.delete("/", authorization("user"), removeAll)
dependentRouter.delete("/:id", authorization("admin"), removeAll) // for admin control

module.exports = dependentRouter