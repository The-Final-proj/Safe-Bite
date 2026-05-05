"use client";

import { useState } from "react";
import axios from "@/lib/axios";

export default function CreateProduct() {
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("stock", form.stock);
    data.append("category", form.category);

    data.append("allergens", JSON.stringify(["milk"]));
    data.append("freeFrom", JSON.stringify(["gluten"]));

    data.append("image", form.image);

    await axios.post("/products", data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="name" onChange={(e) => setForm({...form, name: e.target.value})} />
      <input type="file" onChange={(e) => setForm({...form, image: e.target.files[0]})} />
      <button>Add</button>
    </form>
  );
}