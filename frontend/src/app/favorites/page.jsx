'use client'
import FavoriteCard from '@/components/FavoriteCard'
import { useFavorite } from '@/context/FavoritesContext'
import Link from 'next/link'
import React from 'react'

const page = () => {

    const {favorite} = useFavorite()
    console.log(favorite)

  return (
    <div>
        <div className="min-vh-100 bg-ligh py-4 px-3">
            <div className="d-flex justify-content-between align-items-center px-2 mb-4 flex-wrap gap-2">
                <div className='d-flex flex-column align-items-center'>
                    <h5 className="fw-bold mb-0">My Favorites</h5>
                    <span className="text-muted small">
                        {favorite?.items?.length ? `${favorite?.items?.length} saved item(s)` : "no saved items"}
                    </span>
                </div>
            </div>

            {favorite?.items?.length? 
                (
                    <div className="row g-3 px-1">
                        {
                            favorite?.items?.map(item => {
                                return (
                                    <div key={item._id} className="col-12 col-sm-6 col-xl-4">
                                        <FavoriteCard id={item.product._id} name={item.product.name} image={item.product.image} price={item.product.price}></FavoriteCard>
                                    </div>
                                    
                                )
                            })
                        }
                    </div>
                )
            : (
                <div className="text-center py-5 text-muted">
                    <p className="mt-3 fs-6">
                        You haven't saved anything yet
                    </p>
                    <Link href={"/"} className='btn btn-dark btn-sm rounded-pill px-4 mt-1'>
                        Browse Products
                    </Link>
                </div>
            )
            
            }
        </div>
    </div>
  )
}

export default page