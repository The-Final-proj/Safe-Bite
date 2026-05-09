'use client'
import CardInCart from '@/components/CardInCart'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useCart } from '@/context/CartContext'
import { useDependent } from '@/context/DependentContext'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {

    const {cart} = useCart();
    const [filter, setFilter] = useState('All')
    const [filtered, setFiltered] = useState(cart?.items || [])
    const [delivery, setDelivery] = useState(3)
    const [promoDiscount, setPromoDiscount] = useState(0)
    console.log(cart)
    useEffect(()=>{
        setFiltered(cart?.items || []) // change later to the correct filter
    }, [cart])
    const {dependents} = useDependent()

  return (
    <div>
            <div className="min-vh-100 bg-light py-4 px-3">
                <div className="row g-4 px-2">
                    <div className="col-12 col-lg-7">
                        <div className="mb-3">
                            <label className="label-form text-muted small">Filter</label>
                            <select className="form-select" style={{maxWidth: 200}}onChange={(e)=>{setFilter(e.target.value)}}>
                                <option>All</option> {/*bring members here*/}
                                {
                                    dependents.map(elem=>{
                                        return (
                                            <option key={elem._id}>{elem.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            {
                                filtered.length === 0 ?
                                <p className="text-muted text-center py-5">no items here</p>
                                :
                                filtered.map((elem)=>{
                                return (
                                    <CardInCart key={elem._id} id={elem.product._id} price={elem.product.price} title={elem.product.name} quantity={elem.quantity} img={elem.product.image}></CardInCart>
                                )})
                            }  
                        </div>
                    </div>

                    <div className="col-12 col-lg-5">
                        <div className="bg-white rounded-3 border p-4">
                            <h5 className="fw-bold text-decoration-underline mb-4">
                                Order Summary
                            </h5>                        
                            
                            <div className="d-flex justify-content-between mb-2">
                                <span>Items Subtotal</span>
                                <span className="text-success">+{cart?.total} JOD</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span>Delivery</span>
                                <span className="text-success">+3 JOD</span>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <span>Promo Code</span>
                                <span className="text-danger">-0 JOD</span>
                            </div>

                            <hr/>

                            <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                                <span className="text-decoration-underline">Total</span>
                                <span>{cart?.total - (cart?.total * promoDiscount) + delivery} JOD</span>
                            </div>

                            <label className="form-label small text-muted">Promo Code</label>
                            <div className="d-flex gap-2 mb-1">
                                <input placeholder='Enter Promo Code' className="form-control" />
                                <button className="btn btn-dark px-3">ADD</button>
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <button className="btn btn-dark ">CHECK OUT</button>
                                <Link href={"/products"} className='btn btn-light  border'>Continue Shopping</Link>
                            </div>

                            <hr className="mt-4" />
                            <div className="d-flex justify-content-between">
                                <a href="#" className="text-dark text-decoration-none small">terms of service</a>
                                <a href="#" className="text-dark text-decoration-none small">contact us</a>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        <Footer />
    </div>
  )
}

export default page