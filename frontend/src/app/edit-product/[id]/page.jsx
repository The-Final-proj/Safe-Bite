"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCategories } from "@/context/CategoriesContext";
import { toast } from "react-toastify";

export default function EditProduct() {
  const { id } = useParams();
  const { token } = useAuth();
  const router = useRouter();

  const categories = useCategories();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://safe-bite-m10p.onrender.com/api/products/${id}`,
      );

      const d = await res.json();

      if (!res.ok) throw new Error(d.message);

      setData({
        name: d.name || "",
        price: d.price || "",
        category: d.category || "",
        description: d.description || "",
      });
    } catch (err) {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://safe-bite-m10p.onrender.com/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      toast.success("Product updated successfully");
      router.push("/supplier");
    } catch (err) {
      toast.error(err.message || "Failed to update");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-dark" />
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container" style={{ maxWidth: 650 }}>
        <div className="card shadow-sm border-0 p-4">

          <h3 className="fw-bold mb-1">Edit Product</h3>
          <p className="text-muted mb-4">
            Update product information
          </p>

          <form onSubmit={handleUpdate}>

            {/* NAME */}
            <label className="form-label">Product Name</label>
            <input
              className="form-control mb-3"
              name="name"
              value={data.name}
              onChange={handleChange}
            />

            {/* PRICE */}
            <label className="form-label">Price (JOD)</label>
            <input
              className="form-control mb-3"
              name="price"
              type="number"
              value={data.price}
              onChange={handleChange}
            />

            {/* CATEGORY (NOW FROM CONTEXT) */}
            <label className="form-label">Category</label>
            <select
              className="form-control mb-3"
              name="category"
              value={data.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>

              {categories?.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* DESCRIPTION */}
            <label className="form-label">Description</label>
            <textarea
              className="form-control mb-4"
              name="description"
              value={data.description}
              onChange={handleChange}
              rows={4}
            />

            {/* BUTTON */}
            <button className="btn btn-dark w-100 py-2">
              Update Product
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}