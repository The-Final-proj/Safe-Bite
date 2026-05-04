const cartModel = require("../models/cartSchema")
const productModel = require("../models/productSchema")

const getCart = async (req, res) => {
    const userId = req.user?._id || req.params.userId
    try {
        const cart = await cartModel.findOne({userId: userId}).populate("userId items.product")
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
    const userId = req.user?._id || req.params.userId 
    const { productId } = req.params
    const quantity = Number(req.query.quantity) || 1

    if (qunatity <= 0) {
        return res.status(400).json("quantity must be greater than 0")
    }

    try {
        const cart = await cartModel.findOne({userId: userId})
        console.log(cart)
        if (!cart) {
            return res.status(404).json("no cart found for this user or user not found")
        }

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json("product not found")
        } 

        const productInCart = cart.items.find(elem=>{
            return elem.product.toString() === productId
        })

        if (productInCart) {
            productInCart.quantity += quantity;
        }

        else {
            cart.items.push({
                product: productId, quantity: quantity 
            })
        }     
               
        cart.total += (product.price * quantity);
        cart.total = Number(cart.total.toFixed(2))
        const saved = await cart.save()
        await saved.populate("items.product")
        res.status(200).json(saved) 
    }

    catch (err) {
        res.status(500).json(err)
    }

}

const incrementProductCount = async (req, res) => {
    const userId = req.user?._id || req.params.userId 
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

        const productInCart = cart.items.find(elem=>{
            return elem.product.toString() === productId
        })

        if (productInCart) {
            console.log(productInCart.product)
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
    const userId = req.user?._id || req.params.userId 
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

        const productInCart = cart.items.find(elem=>{
            return elem.product.toString() === productId
        })

        if (productInCart) {
            cart.total -= product.price;
            productInCart.quantity -= 1;
            if (productInCart.quantity === 0) {
                cart.items = cart.items.filter(elem => {
                    return elem.product.toString() !== productInCart.product.toString()
                })
            }       
            
            const saved = await cart.save()
            await saved.populate("items.product")
            res.status(200).json(saved)
        }

        else {
            return res.status(404).json("product not in cart")
        }

 
    }

    catch (err) {
        res.status(500).json(err)
    }

}

const removeProduct = async (req, res) => {
    const userId = req.user?._id || req.params.userId 
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

        const productInCart = cart.items.find(elem=>{
            return elem.product.toString() === productId
        })

        if (productInCart) {
            cart.total -= (product.price * productInCart.quantity);
            productInCart.quantity = 0;
            cart.items = cart.items.filter(elem => {
                return elem.product.toString() !== productInCart.product.toString()
            })
        
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

module.exports = {getCart, addToCart, incrementProductCount, decrementProductCount, removeProduct}