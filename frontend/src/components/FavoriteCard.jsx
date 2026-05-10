import { useCart } from '@/context/CartContext'
import { useFavorite } from '@/context/FavoritesContext'
import React from 'react'

const HeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
    fill={filled ? '#dc3545' : 'none'} stroke="#dc3545" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
)

const FavoriteCard = ({id, image, name, price}) => {

    const {removeFromFavorites} = useFavorite()
    const {addToCart, cart} = useCart()
    const inCart = cart?.items?.some((elem) => {
        console.log(typeof(id))
        console.log(typeof(elem.product._id))
        return elem.product._id === id
    })

    console.log(inCart)

  return (
    <div className="bg-white rounded-3 border h-100 overflow-hidden position-relative">
      <button
        className="btn btn-sm position-absolute top-0 end-0 m-2 p-1"
        onClick={() => removeFromFavorites(id)}
        title="Remove from Favorites"
      >
        <HeartIcon filled />
      </button>

      <div
        className="bg-secondary-subtle d-flex align-items center justify-content-center overflow-hidden"
        style={{ height: 180 }}
      >
        <img
          src={`https://safe-bite-m10p.onrender.com/${image}`}
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        ></img>
      </div>

      <div className="p-3">
        <div className="fw-semibold text-truncate">{name}</div>
        <div className="text-muted small mb-3">{price} JOD</div>
        <button
          className={`btn btn-sm w-100 rounded-pill btn-${inCart ? "dark" : "success"}`}
          disabled={inCart}
          onClick={() => addToCart(id)}
        >
          {inCart ? "In Cart ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default FavoriteCard