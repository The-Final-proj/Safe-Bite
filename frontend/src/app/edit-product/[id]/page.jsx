"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function EditProduct() {
  const { id } = useParams();
  const { token } = useAuth();
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await fetch(
      `http://localhost:5000/api/products/${id}`
    );
    const d = await res.json();
    setData(d);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      toast.success("Updated");
      router.push("/supplier");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate}>

        <input
          className="form-control mb-2"
          name="name"
          value={data.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="price"
          value={data.price}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="category"
          value={data.category}
          onChange={handleChange}
        />

        <button className="btn btn-dark w-100">
          Update
        </button>

      </form>
    </div>
  );
}