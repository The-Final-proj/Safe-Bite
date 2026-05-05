"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const getProducts = async (query = "") => {
    const res = await axios.get(`/products?search=${query}`);
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts(search);
  }, [search]);

  return (
    <div className="products-container">
      <h1 className="products-title">Products</h1>

      <SearchBar setSearch={setSearch} />

      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}