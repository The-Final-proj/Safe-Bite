const express = require("express")
const favoritesRouter = express.Router();
const {getFavorites, addToFavorites, removeFromFavorites, inFavorites} = require("../controllers/favoritesController")

favoritesRouter.get("/", getFavorites)
favoritesRouter.get("/:userId", getFavorites)
favoritesRouter.patch("/:productId", addToFavorites)
favoritesRouter.patch("/:userId/:productId", addToFavorites)
favoritesRouter.delete("/:productId", removeFromFavorites)
favoritesRouter.delete("/:userId/:productId", removeFromFavorites)
favoritesRouter.get("/check/:productId", inFavorites)
favoritesRouter.get("/check/:userId/:productId", inFavorites)

module.exports = favoritesRouter