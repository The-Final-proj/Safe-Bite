"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useFavorite } from "@/context/FavoritesContext";
import Footer from "./Footer";

const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill={filled ? "#dc3545" : "none"}
    stroke="#dc3545"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

export default function ProductDetails({ product }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, checkFav } = useFavorite();

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const loadFav = async () => {
      const result = await checkFav(product?._id);
      setIsFav(result);
    };

    loadFav();
  }, [product?._id, checkFav]);

  const addFav = (id) => {
    addToFavorites(id);
    setIsFav(true);
  };

  const removeFav = (id) => {
    removeFromFavorites(id);
    setIsFav(false);
  };

  const isSupplier = user?.role === "supplier";

  return (
    <div>
      <div className="container py-5">
        <div className="row g-4">
          {/* IMAGE */}
          <div className="col-md-5">
            <div className="card border-0 shadow-sm overflow-hidden">
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                className="w-100"
                style={{ height: "420px", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* INFO */}
          <div className="col-md-7">
            <div className="card border-0 shadow-sm p-4 h-100">
              <h2 className="fw-bold mb-1">{product.name}</h2>

              <small className="text-muted d-block mb-2">
                {product.category}
              </small>

              <h3 className="text-success fw-bold mb-3">
                {product.price} JOD
              </h3>

              <p className="text-muted mb-4">{product.description}</p>

              {/* ALLERGENS */}
              <div className="mb-4">
                <h6 className="fw-semibold mb-2">Allergens</h6>

                <div className="d-flex flex-wrap gap-2">
                  {product.allergens?.length > 0 ? (
                    product.allergens.map((a, i) => (
                      <span
                        key={i}
                        className="badge bg-danger rounded-pill px-3 py-2"
                      >
                        {a}
                      </span>
                    ))
                  ) : (
                    <span className="badge bg-success rounded-pill px-3 py-2">
                      No Allergens
                    </span>
                  )}
                </div>
              </div>

              {/* BUTTONS */}
              {!isSupplier && (
                <div className="d-flex">
                  <button
                    onClick={() => addToCart(product._id)}
                    className="btn btn-dark w-100 rounded-pill py-2 fw-semibold"
                    style={{
                      backgroundColor: "#111",
                      color: "#FFFBA7",
                    }}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="btn btn-sm"
                    onClick={
                      isFav
                        ? () => removeFav(product._id)
                        : () => addFav(product._id)
                    }
                  >
                    {isFav ? <HeartIcon filled /> : <HeartIcon />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}