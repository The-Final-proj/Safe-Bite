"use client";

import { useEffect, useState } from "react";
import API from "@/app/api";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getProducts = async (query = "") => {
    try {
      const res = await API.get(`/products?search=${query}`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts(search);
  }, [search]);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  return (
    <>
     

      {/* MAIN WRAPPER */}
      <div
        className="d-flex flex-column min-vh-100"
        style={{ background: "#fff" }}
      >
        {/* CONTENT */}
        <div className="container py-3 flex-grow-1">

          {/* HERO */}
          <div
            className="rounded-4 p-4 mb-3 shadow-sm"
            style={{
              background:
                "linear-gradient(135deg, #ffffff, #FFFBA7)",
              border: "1px solid #f1f1f1",
            }}
          >
            <div className="row align-items-center">

              <div className="col-lg-6">

                <h1 className="fw-bold mb-2 text-dark">
                  Safe & Healthy Products
                </h1>

                <p className="text-secondary mb-3">
                  Discover food and drinks carefully selected for healthier living.
                </p>

                <button
                  className="btn rounded-pill px-4 fw-semibold"
                  style={{
                    backgroundColor: "#111",
                    color: "#FFFBA7",
                    border: "none",
                  }}
                >
                  Explore Now
                </button>

              </div>

              <div className="col-lg-6 mt-3 mt-lg-0">
                <SearchBar setSearch={setSearch} />
              </div>

            </div>
          </div>

          {/* FILTER */}
          <div className="bg-white rounded-4 shadow-sm p-3 mb-3 border">

            <div className="row align-items-center g-2">

              <div className="col-md-6">

                <h5 className="fw-bold m-0 text-dark">
                  Products ({filteredProducts.length})
                </h5>

              </div>

              <div className="col-md-6 d-flex justify-content-md-end">

                <select
                  className="form-select"
                  style={{ maxWidth: "220px" }}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value)
                  }
                >
                  <option value="all">All Categories</option>
                  <option value="food">Food</option>
                  <option value="drinks">Drinks</option>
                  <option value="snacks">Snacks</option>
                </select>

              </div>

            </div>
          </div>

          {/* PRODUCTS */}
          <div className="row g-3">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <div
                  key={p._id}
                  className="col-lg-4 col-md-6"
                >
                  <ProductCard product={p} />
                </div>
              ))
            ) : (
              <div className="text-center py-5">
                <h5 className="text-muted">
                  No products found
                </h5>
              </div>
            )}

          </div>

        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}