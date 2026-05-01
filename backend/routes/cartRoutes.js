const express = require("express")
const {getCart, addToCart, incrementProductCount, decrementProductCount, removeProduct} = require("../controllers/cartController")
const cartRouter = express.Router();

cartRouter.get("/", getCart)
cartRouter.get("/:userId", getCart)
cartRouter.post("/:productId", addToCart)
cartRouter.post("/:userId/:productId", addToCart)
cartRouter.patch("/increase/:productId", incrementProductCount)
cartRouter.patch("/increase/:userId/:productId", incrementProductCount)
cartRouter.patch("/decrease/:productId", decrementProductCount)
cartRouter.patch("/decrease/:userId/:productId", decrementProductCount)
cartRouter.delete("/:productId", removeProduct)
cartRouter.delete("/:userId/:productId", removeProduct)

module.exports = cartRouter