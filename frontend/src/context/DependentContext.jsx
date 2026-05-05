'use client'
import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import API from "@/app/api";

const DependentContext = createContext();

export const DependentProvider = ({children}) => {

    const [dependents, setDependents] = useState([])
    const {user} = useAuth()

    useEffect(()=>{
        const getDependents = async () => {
            if (!user) {
                setDependents([])
                return
            }

            try {
                const res = await API.get("/user/dependents")
                setDependents(res.data)
            }

            catch(err) {
                console.log(err)
            }
        }
        getDependents();
    }, [user])

    const addDependent = async (_name, relation, [...allergens]) => {

    }

    const deleteDependent = async (id) => {

    }

    const removeAll = async () => {

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