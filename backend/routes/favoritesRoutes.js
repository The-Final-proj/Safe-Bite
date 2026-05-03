const express = require("express")
const favoritesRouter = express.Router();
const {getFavorites, addToFavorites, removeFromFavorites, inFavorites} = require("../controllers/favoritesController")
const authorization = require("../middleware/authorizeRole")


favoritesRouter.get("/", authorization("user"), getFavorites)
favoritesRouter.get("/:userId", authorization("admin"), getFavorites)
favoritesRouter.patch("/:productId", authorization("user"), addToFavorites)
favoritesRouter.patch("/:userId/:productId", authorization("admin"), addToFavorites)
favoritesRouter.delete("/:productId", authorization("user"), removeFromFavorites)
favoritesRouter.delete("/:userId/:productId", authorization("admin"), removeFromFavorites)
favoritesRouter.get("/check/:productId", authorization("user"), inFavorites)
favoritesRouter.get("/check/:userId/:productId", authorization("admin"), inFavorites)

module.exports = favoritesRouter