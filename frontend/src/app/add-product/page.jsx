"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddProduct() {
  const { token } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("category", form.category);
    data.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!res.ok) throw new Error();

      toast.success("Product added");
      router.push("/supplier");
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="price"
          className="form-control mb-2"
          placeholder="Price"
          onChange={handleChange}
        />

        <select
          name="category"
          className="form-control mb-2"
          onChange={handleChange}
          value={form.category}
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="snacks">Snacks</option>
          <option value="drinks">Drinks</option>
          <option value="desserts">Desserts</option>
        </select>

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="btn btn-dark w-100">Submit</button>
      </form>
    </div>
  );
}
