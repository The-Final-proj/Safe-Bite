'use client'
import React, { createContext, useContext } from 'react'

const AllergensContext = createContext()

export const AllergensProvider = ({children}) => {
    const allergens = ["Milk", "Eggs", "Peanuts", "Tree nuts", "Wheat", "Soy", "Fish", "Mustard", "Sesame"]
  return (
    <AllergensContext.Provider value = {allergens}>
        {children}
    </AllergensContext.Provider>
  )
}

export const useAllergens = () => {
    return useContext(AllergensContext)
}