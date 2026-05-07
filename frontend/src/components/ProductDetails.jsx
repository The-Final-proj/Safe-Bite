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
    <div className="container mt-4">

      <div className="row">

        {/* IMAGE */}
        <div className="col-md-5">
          <img
            src={`http://localhost:5000/${product.image}`}
            className="img-fluid rounded"
            alt={product.name}
          />
        </div>

        {/* INFO */}
        <div className="col-md-7">

          <h2>{product.name}</h2>

          <h4 className="text-success">{product.price} JOD</h4>

          <p>{product.description}</p>

          <p><b>Category:</b> {product.category}</p>

          {/* ALLERGENS */}
          <div className="mb-3">
            <b>Allergens:</b>{" "}
            {product.allergens?.length ? (
              product.allergens.map((a, i) => (
                <span key={i} className="badge bg-danger me-1">
                  {a}
                </span>
              ))
            ) : (
              <span className="badge bg-secondary">None</span>
            )}
          </div>

          {/* MEMBER SELECT */}
          <div className="mb-3">
            <label className="form-label">Buy for:</label>

            <select
              className="form-select"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <option value="me">Me</option>

              {user?.dependent?.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={addToCart}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}