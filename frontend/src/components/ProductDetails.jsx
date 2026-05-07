"use client";

import { useState } from "react";
import API from "@/app/api";
import { useAuth } from "@/context/AuthContext";

export default function ProductDetails({ product }) {
  const { user } = useAuth();
  const [selectedMember, setSelectedMember] = useState("me");

  const addToCart = async () => {
    try {
      const memberId =
        selectedMember === "me" ? null : selectedMember;

      await API.post("/cart/add", {
        productId: product._id,
        memberId,
      });

      alert("Added to cart");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container py-5">

      <div className="row g-4">

        {/* IMAGE */}
        <div className="col-md-5">

          <div className="card border-0 shadow-sm overflow-hidden">

            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
              className="w-100"
              style={{
                height: "420px",
                objectFit: "cover",
              }}
            />

          </div>

        </div>

        {/* INFO */}
        <div className="col-md-7">

          <div className="card border-0 shadow-sm p-4 h-100">

            {/* TITLE */}
            <h2 className="fw-bold mb-1">
              {product.name}
            </h2>

            <small className="text-muted d-block mb-2">
              {product.category}
            </small>

            {/* PRICE */}
            <h3 className="text-success fw-bold mb-3">
              {product.price} JOD
            </h3>

            {/* DESCRIPTION */}
            <p className="text-muted mb-4">
              {product.description}
            </p>

            {/* ALLERGENS */}
            <div className="mb-4">

              <h6 className="fw-semibold mb-2">
                Allergens
              </h6>

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

            {/* MEMBER SELECT */}
            <div className="mb-4">

              <label className="form-label fw-semibold">
                Buy for
              </label>

              <select
                className="form-select rounded-pill shadow-sm"
                value={selectedMember}
                onChange={(e) =>
                  setSelectedMember(e.target.value)
                }
              >
                <option value="me">Me</option>

                {user?.dependent?.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name}
                  </option>
                ))}
              </select>

            </div>

            {/* BUTTON */}
            <button
              onClick={addToCart}
              className="btn btn-dark w-100 rounded-pill py-2 fw-semibold"
              style={{
                backgroundColor: "#111",
                color: "#FFFBA7",
              }}
            >
              Add to Cart
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}