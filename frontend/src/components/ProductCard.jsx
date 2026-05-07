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
      className="card shadow-sm h-100"
      style={{ cursor: "pointer" }}
    >
      <img
        src={`http://localhost:5000/${product.image}`}
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}
        alt={product.name}
      />

      <div className="card-body">
        <h5>{product.name}</h5>

        <p className="text-success">{product.price} JOD</p>

        <div>
          {product.allergens?.length > 0 ? (
            product.allergens.map((a, i) => (
              <span key={i} className="badge bg-danger me-1">
                {a}
              </span>
            ))
          ) : (
            <span className="badge bg-secondary">No allergens</span>
          )}
        </div>
      </div>
    </div>
  );
}



