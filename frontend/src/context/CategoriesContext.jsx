'use client'
import React, { createContext, useContext } from 'react'

const CategoriesContext = createContext()

export const CategoriesProvider = ({ children }) => {
  const categories = [
    "food",
    "snacks",
    "drinks",
    "desserts"
  ]

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategories = () => {
  return useContext(CategoriesContext)
}