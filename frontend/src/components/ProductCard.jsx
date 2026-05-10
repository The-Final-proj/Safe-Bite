"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) {
      toast.error("You must login first");

      setTimeout(() => {
        router.push("/login");
      }, 800);

      return;
    }

    router.push(`/products/${product._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="card border-0 shadow-sm h-100 overflow-hidden"
      style={{ cursor: "pointer" }}
    >
      {/* IMAGE */}
      <div className="position-relative">
        <img
          src={
            product.image?.startsWith("http")
              ? product.image
              : `https://safe-bite-m10p.onrender.com/${product.image}`
          }
          alt={product.name}
          className="card-img-top"
          style={{
            height: "190px",
            objectFit: "cover",
          }}
        />

        {/* PRICE BADGE */}
        <span
          className="position-absolute top-0 end-0 m-2 badge rounded-pill"
          style={{
            backgroundColor: "#111",
            color: "#FFFBA7",
            padding: "8px 12px",
            fontSize: "12px",
          }}
        >
          {product.price} JOD
        </span>
      </div>

      {/* BODY */}
      <div className="card-body">
        {/* NAME */}
        <h6 className="fw-bold mb-1 text-dark">{product.name}</h6>

        {/* CATEGORY */}
        <small className="text-muted d-block mb-2">{product.category}</small>

        {/* ALLERGENS */}
        <div className="d-flex flex-wrap gap-1">
          {product.allergens?.length > 0 ? (
            product.allergens.map((a, i) => (
              <span
                key={i}
                className="badge bg-danger rounded-pill px-2 py-1"
                style={{ fontSize: "11px" }}
              >
                {a}
              </span>
            ))
          ) : (
            <span className="badge bg-success rounded-pill px-2 py-1">
              Safe
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
