const express = require("express")
const {getCart, addToCart, incrementProductCount, decrementProductCount, removeProduct} = require("../controllers/cartController")
const cartRouter = express.Router();

cartRouter.get("/", getCart)
cartRouter.get("/:userId", getCart)
cartRouter.patch("/:productId", addToCart)
cartRouter.patch("/:userId/:productId", addToCart)
cartRouter.patch("/:productId", incrementProductCount)
cartRouter.patch("/:userId", incrementProductCount)
cartRouter.patch("/:productId", decrementProductCount)
cartRouter.patch("/:userId/:productId", decrementProductCount)
cartRouter.delete("/:productId", removeProduct)
cartRouter.delete("/:userId/:productId", removeProduct)

module.exports = cartRouter