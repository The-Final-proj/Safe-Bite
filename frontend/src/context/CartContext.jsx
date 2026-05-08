'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import API from "@/app/api";

const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const user = useAuth().user

    useEffect(()=>{
        const getCart = async () => {
            if (!user) {
                setCart([])
                return
            }

            try {
                const res = await API.get("/cart")
                console.log(res.data)
                setCart(res.data)
            }

            catch(err) {
                console.log(err)
            }
        }

        if (user?.role !== 'admin')
            getCart()
    
    }, [user])

    const addToCart = async(productId) => {
        try {
            const res = await API.post(`/cart/${productId}`)
            setCart(res.data)
        }

        catch (err) {
            console.log(err)
        }
    }

    const incrementCount = async(productId) => {
        try {
            const res = await API.patch(`/cart/increase/${productId}`)
            setCart(res.data)
        }

        catch (err) {
            console.log(err)
        }
    }

    const decrementCount = async(productId) => {
        try {
            const res = await API.patch(`/cart/decrease/${productId}`)
            setCart(res.data)
        }

        catch (err) {
            console.log(err)
        }
    }

    const removeProduct = async(productId) => {
        try {
            const res = await API.delete(`/cart/${productId}`)
            setCart(res.data)
        }

        catch (err) {
            console.log(err)
        }
    }

    const getCartAdmin = async (userId) => {

        try {
            const res = await API.get(`/cart/${userId}`)
            console.log(res.data)
            setCart(res.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeProduct, incrementCount, decrementCount, getCartAdmin}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}