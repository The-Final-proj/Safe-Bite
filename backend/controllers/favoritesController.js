const favoritesModel = require("../models/favoritesSchema")
const productModel = require("../models/productSchema")

const getFavorites = async (req, res) => {
    const userId = req.user?._id || req.params.userId
    try {
        const favorites = await favoritesModel.findOne({userId: userId}).populate("userId items.product")
        if (!favorites) {
            return res.status(404).json("no favorites found for this user or user not found")
        }

        res.status(200).json(favorites)
    }

    catch (err) {
        res.status(500).json(err)
    }
}

const inFavorites = async (req, res) => {
    const userId = req.user?._id || req.params.userId
    const {productId} = req.params

    try {
        const exists = await favoritesModel.exists({userId: userId, "items.product": productId})

        res.json({inFavorites: !!exists})
    }

    catch (err) {
        res.status(500).json(err)
    }

    // in front end:
    // const res = axios.get(this function)
    // const data = await res.json()
    // return (data.inFavorites) => returns true or false
}

const addToFavorites = async (req, res) => {
    const userId = req.user?._id || req.params.userId 
    const { productId } = req.params

    try {
        const favorites = await favoritesModel.findOne({userId: userId})
        if (!favorites) {
            return res.status(404).json("no facorites list found for this user or user not found")
        }

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json("product not found")
        } 

        const productInFavorites = favorites.items.find(elem=>{
            return elem.product.toString() === productId
        })

        if (productInFavorites) {
            return res.json("product already in favourites")
        }

        else {
            favorites.items.push({
                product: productId
            })
        }  

        const saved = await favorites.save()
        await saved.populate("items.product")
        res.status(200).json(saved) 

    }

    catch (err) {
        res.status(500).json(err)
    }
}

const removeFromFavorites = async (req, res) => {
    const userId = req.user?._id || req.params.userId 
    const { productId } = req.params

    try {
        const favorites = await favoritesModel.findOne({userId: userId})
        if (!favorites) {
            return res.status(404).json("no facorites list found for this user or user not found")
        }

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json("product not found")
        } 

        const productInFavorites = favorites.items.find(elem=>{
            return elem.product.toString() === productId
        })

        if (!productInFavorites) {
            return res.json("product not in favourites")
        }

        else {
            favorites.items = favorites.items.filter((elem) => {
                elem.product.toString() !== productId
            })
        }  

        const saved = await favorites.save()
        await saved.populate("items.product")
        res.status(200).json(saved) 

    }

    catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {getFavorites, addToFavorites, removeFromFavorites, inFavorites}