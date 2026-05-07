'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import API from "@/app/api";

const DependentContext = createContext();

export const DependentProvider = ({children}) => {

    const [dependents, setDependents] = useState([])
    const [count, setCount] = useState(false)

    useEffect(()=>{
        const getDependents = async () => {
            try {
                const res = await API.get("/users/dependents")
                console.log(res.data.dependent)
                setDependents(res.data.dependent)
            }

            catch(err) {
                console.log(err)
            }
        }
        getDependents();
    }, [count])

    const addDependent = async (name, relation, ...allergens) => {
        try {
            const res = await API.patch("/users/dependents/add", {
                name, relation, allergies: allergens
            })
            setCount(!count)
        }

        catch (err) {
            console.log(err)
        }
    }

    const deleteDependent = async (id) => {
        try {
            const res = await API.patch(`/users/dependents/del/${id}`)
            setCount(!count)
        }

        catch(err) {
            console.log(err)
        }

    }

    const removeAll = async () => {
        try {
            const res = await API.delete(`/users/dependents`)
            setCount(!count)
        }

        catch(err) {
            console.log(err)
        }
    }


    return (
        <DependentContext.Provider value = {{dependents, addDependent, removeAll, deleteDependent}}>
            {children}
        </DependentContext.Provider>
    )
}

export const useDependent = () => {
    return useContext(DependentContext)
}