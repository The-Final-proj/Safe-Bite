"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAllergens } from "@/context/allergensContext";
import { useCategories } from "@/context/CategoriesContext";

export default function AddProduct() {
  const { token } = useAuth();
  const router = useRouter();

  const allergensList = useAllergens();
  const categories = useCategories();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    customAllergens: "",
  });

  const [imageType, setImageType] = useState("upload");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [selectedFreeFrom, setSelectedFreeFrom] = useState([]);

  const freeFrom = [
    "Gluten Free",
    "Sugar Free",
    "Dairy Free",
    "Lactose Free",
    "Nut Free",
    "Egg Free",
    "Soy Free",
    "Vegan",
    "Vegetarian",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleAllergen = (item) => {
    setSelectedAllergens((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  const toggleFreeFrom = (item) => {
    setSelectedFreeFrom((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.stock ||
      !form.category
    ) {
      return toast.error("Fill all required fields");
    }

    const data = new FormData();

    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", Number(form.price));
    data.append("stock", Number(form.stock));
    data.append("category", form.category);

    data.append("allergens", JSON.stringify(selectedAllergens));
    data.append("freeFrom", JSON.stringify(selectedFreeFrom));

    data.append(
      "customAllergens",
      JSON.stringify(
        form.customAllergens
          ? form.customAllergens.split(",").map((i) => i.trim())
          : []
      )
    );

    if (imageType === "upload" && imageFile) {
      data.append("image", imageFile);
    }

    if (imageType === "url" && imageUrl) {
      data.append("image", imageUrl);
    }

    try {
      const res = await fetch(
        "https://safe-bite-m10p.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        },
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      toast.success("Product added");
      router.push("/supplier");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to add product");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Add Product</h2>

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Name *"
          onChange={handleChange}
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Description *"
          onChange={handleChange}
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          className="form-control mb-2"
          placeholder="Price *"
          onChange={handleChange}
        />

        {/* STOCK */}
        <input
          name="stock"
          type="number"
          className="form-control mb-2"
          placeholder="Stock *"
          onChange={handleChange}
        />

        {/* CATEGORY (NOW DYNAMIC) */}
        <select
          name="category"
          className="form-control mb-3"
          onChange={handleChange}
        >
          <option value="">Select Category *</option>

          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* ALLERGENS */}
        <div className="mb-3">
          <label className="form-label fw-bold">Allergens</label>

          <div className="d-flex flex-wrap gap-2">
            {allergensList.map((item) => (
              <label key={item} className="form-check me-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedAllergens.includes(item)}
                  onChange={() => toggleAllergen(item)}
                />
                <span className="form-check-label">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* FREE FROM */}
        <div className="mb-3">
          <label className="form-label fw-bold">Free From</label>

          <div className="d-flex flex-wrap gap-2">
            {freeFrom.map((item) => (
              <label key={item} className="form-check me-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedFreeFrom.includes(item)}
                  onChange={() => toggleFreeFrom(item)}
                />
                <span className="form-check-label">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* CUSTOM ALLERGENS */}
        <input
          name="customAllergens"
          className="form-control mb-3"
          placeholder="Custom Allergens (comma separated)"
          onChange={handleChange}
        />

        {/* IMAGE TYPE */}
        <div className="mb-3 d-flex gap-2">
          <button
            type="button"
            className={`btn ${imageType === "upload" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setImageType("upload")}
          >
            Upload
          </button>

          <button
            type="button"
            className={`btn ${imageType === "url" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setImageType("url")}
          >
            URL
          </button>
        </div>

        {/* FILE */}
        {imageType === "upload" && (
          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        )}

        {/* URL */}
        {imageType === "url" && (
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Image URL"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        )}

        <button className="btn btn-dark w-100">
          Submit
        </button>
      </form>
    </div>
  );
}