'use client'
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {


    const [user, setUser] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const _user = JSON.parse(localStorage.getItem("user"))    
        const _token = localStorage.getItem("token")  
        console.log(_user)
        setUser(_user)
        setToken(_token)  
        setLoading(false)

    }, [])
    
    const login = (_token, userData) => {
        localStorage.setItem("token", _token)
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        setToken(_token)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{user, setUser, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuth = () => {
    return useContext(AuthContext)
}