const cartModel = require("../models/cartSchema")

const getCart = async (req, res) => {
    const userId = req.user._id || req.params.userId
    try {
        const cart = await cartModel.findOne({userId: userId}).populate("user items.product")
        if (!cart) {
            return res.status(404).json("no cart found for this user or user not found")
        }

        res.status(200).json(cart)
    }

    catch (err) {
        res.status(500).json(err)
    }
}

const addToCart = async (req, res) => {
    const userId = req.user._id || req.params.userId 
    const { productId } = req.params
    try {
        const cart = await cartModel.findOne({userId: userId})
        if (!cart) {
            return res.status(404).json("no cart found for this user or user not found")
        }

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json("product not found")
        } 

        const productInCart = cart.items.filter(elem=>{
            return elem.product.toString() === productId
        })

        if (productInCart) {
            productInCart.quantity += 1;

        }

        else {
            cart.items.push({
                product: productId, quantity: 1 
            })
        }     
               
        cart.total += product.price;
        const saved = await cart.save()
        await saved.populate("items.product")
        res.status(200).json(saved) 
    }

    catch (err) {
        res.status(500).json(err)
    }

}

const incrementProductCount = async (req, res) => {
    const userId = req.user._id || req.params.userId 
    const { productId } = req.params
    try {
        const cart = await cartModel.findOne({userId: userId})
        if (!cart) {
            return res.status(404).json("no cart found for this user or user not found")
        }

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json("product not found")
        }  

        const productInCart = cart.items.filter(elem=>{
            return elem.product.toString() === productId
        })

        if (productInCart) {
            productInCart.quantity += 1;
            cart.total += product.price;
        }

        else {
            return res.status(404).json("product not in cart")
        }

        const saved = await cart.save()
        await saved.populate("items.product")
        res.status(200).json(saved)
    }

    catch (err) {
        res.status(500).json(err)
    }

}

const decrementProductCount = async (req, res) => {
    const userId = req.user._id || req.params.userId 
    const { productId } = req.params
    try {
        const cart = await cartModel.findOne({userId: userId})
        if (!cart) {
            return res.status(404).json("no cart found for this user or user not found")
        }

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json("product not found")
        }  
    }

    catch (err) {
        res.status(500).json(err)
    }

}