"use client";

import { useEffect, useState } from "react";
import API from "@/app/api";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


export default function Home() {

    const {user} = useAuth();
    const router = useRouter()
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ================= GET PRODUCTS =================
  const getProducts = async (query = "") => {
    try {
      let url = `/products?search=${query}`;

      // supplier يشوف منتجاته فقط
      if (user?.role === "supplier") {
        url = `/supplier/my-products`;
      }

      const res = await API.get(url);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // مهم: guest برضه يشوف منتجات
    getProducts(search);
  }, [search, user]);

  // ================= FILTER =================
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  // ================= CLICK PRODUCT =================
  const handleProductClick = (productId) => {
    if (!user) {
      router.push("/login");
    } else {
      router.push(`/products/${productId}`);
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ background: "#fff" }}
    >
      <div className="container py-3 flex-grow-1">
        {/* HERO */}
        <div
          className="rounded-4 p-4 mb-3 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #ffffff, #FFFBA7)",
            border: "1px solid #f1f1f1",
          }}
        >
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="fw-bold mb-2 text-dark">
                {user?.role === "supplier"
                  ? "Your Products Dashboard"
                  : "Safe & Healthy Products"}
              </h1>

              <p className="text-secondary mb-3">
                {user?.role === "supplier"
                  ? "Manage your products easily"
                  : "Browse products safely based on allergens and preferences"}
              </p>
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
              <h5 className="fw-bold m-0">
                Products ({filteredProducts.length})
              </h5>
            </div>

            <div className="col-md-6 d-flex justify-content-md-end">
              <select
                className="form-select"
                style={{ maxWidth: "220px" }}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="food">Food</option>
                <option value="drinks">Drinks</option>
                <option value="snacks">Snacks</option>
                <option value="desserts">Desserts</option>
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
                onClick={() => handleProductClick(p._id)}
                style={{ cursor: "pointer" }}
              >
                <ProductCard product={p} />
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <h5 className="text-muted">No products found</h5>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
