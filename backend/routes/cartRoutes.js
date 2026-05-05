const express = require("express")
const {getCart, addToCart, incrementProductCount, decrementProductCount, removeProduct} = require("../controllers/cartController")
const cartRouter = express.Router();
const authorization = require("../middleware/authorizeRole")

cartRouter.get("/", authorization("user"), getCart)
cartRouter.get("/:userId", authorization("admin"), getCart)
cartRouter.post("/:productId", authorization("user"), addToCart)
cartRouter.post("/:userId/:productId", authorization("admin"), addToCart)
cartRouter.patch("/increase/:productId", authorization("user"), incrementProductCount)
cartRouter.patch("/increase/:userId/:productId", authorization("admin"), incrementProductCount)
cartRouter.patch("/decrease/:productId", authorization("user"), decrementProductCount)
cartRouter.patch("/decrease/:userId/:productId", authorization("admin"), decrementProductCount)
cartRouter.delete("/:productId", authorization("user"), removeProduct)
cartRouter.delete("/:userId/:productId", authorization("admin"), removeProduct)

module.exports = cartRouter