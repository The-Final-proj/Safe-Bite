'use client'
import { useCart } from '@/context/CartContext'
import React from 'react'

const CardInCart = ({img, title, price, quantity, id}) => {
    const {incrementCount, decrementCount, removeProduct} = useCart()
  return (
    <div>
        <div className="bg-white rounded-3 border p-3 d-flex align-items center gap-3">
            <div className="rounded-2 bg-secondary-subtle flex-shrink-0 d-flex align-items-center justify-content-center" style={{width: 90, height: 80}}>
                <img src={{img}}/>
            </div>

            <div className="flex-grow-1">
                <div className="fw-semibold fs-5">{title}</div>
                <div className="text-muted small">{price}</div>

                <div className="d-flex align-items-center gap-3 mt-3 flex-wrap">
                    <div className="d-flex align-items-center border rounded-pill overflow-hidden">
                        <button className="btn-btn-sm btn-light px-2 py-1 border-0" onClick={()=>decrementCount(id)}>
                            -
                        </button>
                        <span className="px-2 small">{quantity}</span>
                        <button onClick={()=>incrementCount(id)} className="btn-btn-sm btn-light px-2 py-1 border-0">
                            +
                        </button>
                    </div>

                    <span className="fw-semibold">{price*quantity} JOD</span>
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3 ms-auto" onClick={()=>removeProduct(id)}>remove ×</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardInCart