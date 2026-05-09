'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext";
import API from "@/app/api";

const FavoriteContext = createContext()

export const FavoriteProvider = ({children}) => {
    const [favorite, setFavorite] = useState();
    const {user} = useAuth()

    useEffect(() => {
        const getFavorite = async () => {
            if (!user) {
                setFavorite([]);
                return
            }

            try {
                const res = await API.get("/favorites")
                console.log(res.data)
                setFavorite(res.data)
            }
            
            catch(err) {
            console.log(err)
            }
        }

        if (user?.role !== "admin")
            getFavorite();

    }, [user])

    const addToFavorites = async(productId) => {
        try {
            const res = await API.patch(`/favorites/${productId}`)
            setFavorite(res.data)
        }

        catch (err) {
            console.log(err)
        }
    }

    const removeFromFavorites = async(productId) => {
        try {
            const res = await API.delete(`/favorites/${productId}`)
            setFavorite(res.data)
        }

        catch (err) {
            console.log(err)
        }
    }

    const checkFav = async (productId) => {
        try {
            const res = await API.get(`/favorites/check/${productId}`)
            console.log(res.data.inFavorites)
            return (res.data.inFavorites)
        }

        catch (err) {
            console.log(err)
        }
    } 

    return (
        <FavoriteContext.Provider value={{favorite, addToFavorites, removeFromFavorites, checkFav}}>
            {children}
        </FavoriteContext.Provider>
    )
}

export const useFavorite = () => {
    return useContext(FavoriteContext)
}
