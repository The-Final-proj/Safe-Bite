
"use client";
 
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
 
import API from "@/app/api";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
 
import { useAuth } from "@/context/AuthContext";
import { useAllergens } from "@/context/allergensContext";
import { useDependent } from "@/context/DependentContext";
 
const CATEGORIES = ["all", "food", "drinks", "snacks"];
 
export default function ProductsPage() {
  const { user } = useAuth();
  const { dependents } = useDependent();
  const ALLERGEN_OPTIONS = useAllergens();
  const { id } = useParams();
 
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeAllergens, setActiveAllergens] = useState([]);
 
  // Sync selected member from URL param
  useEffect(() => {
    const member = dependents.find((d) => d._id === id) ?? null;
    setSelectedMember(member);
  }, [id, dependents]);
 
  // Sync allergens when member changes
  useEffect(() => {
    console.log(selectedMember)
    setActiveAllergens(selectedMember?.allergies ?? []);
  }, [selectedMember]);
 
  // Fetch products on search change
  const fetchProducts = useCallback(async (query = "") => {
    try {
      const res = await API.get(`/products?search=${query}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }, []);
 
  useEffect(() => {
    fetchProducts(search);
  }, [search, fetchProducts]);
 
  // Toggle allergen checkbox
  const toggleAllergen = (allergen) => {
    setActiveAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    );
  };
 
  // Save allergens back to the member (wire up your API call here)
  const saveAllergens = async () => {
    if (!selectedMember) return;
    try {
      await API.patch(`/dependents/${selectedMember._id}`, {
        allergies: activeAllergens,
      });
      // Optionally show a success toast here
    } catch (err) {
      console.error("Failed to save allergens:", err);
    }
  };
 
  // Filter products by active allergens and category
  const filteredProducts = products
    .filter((p) => !p.allergens?.some((a) => activeAllergens.includes(a)))
    .filter((p) => selectedCategory === "all" || p.category === selectedCategory);
 
  return (
    <>
      <Navbar />
 
      <div
        className="min-vh-100 py-3"
        style={{ background: "linear-gradient(to bottom right, #f8f9fa, #eef2ff)" }}
      >
        <div className="container-fluid">
 
          <div className="bg-white rounded-4 shadow-sm p-3 mb-3">
            <div className="row align-items-center g-2">
              <div className="col-lg-6 d-flex gap-2 flex-wrap">
                <Link href="/products" className="btn btn-dark rounded-pill px-3">
                  Products
                </Link>
                <Link href="/cart" className="btn btn-outline-dark rounded-pill px-3">
                  Cart
                </Link>
                <Link href="/favorites" className="btn btn-outline-danger rounded-pill px-3">
                  Favorites
                </Link>
              </div>
              <div className="col-lg-6">
                <SearchBar setSearch={setSearch} />
              </div>
            </div>
          </div>
 
          <div className="row g-3">
 
            {/* LEFT SIDEBAR */}
            <div className="col-lg-3">
 
              {/* MEMBERS */}
              <div className="card border-0 shadow-sm rounded-4 mb-3">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">Members</h6>
                  <div className="d-flex align-items-center flex-column gap-2">
                    {dependents.map((m) => (
                      <button
                        key={m._id}
                        onClick={() => setSelectedMember(m)}
                        className={`w-100 btn rounded-3 text-start px-3 py-2 ${
                          selectedMember?._id === m._id
                            ? "btn-dark"
                            : "btn-outline-secondary"
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}

                    <Link href={"/welcome/add-member"} className="btn text-light btn-dark text-center rounded-pill text-start px-3 py-2 w-75">+ Add New</Link>
                    
                    {dependents.length === 0 && (
                      <small className="text-muted">No members found.</small>
                    )}
                  </div>
                </div>
              </div>
 
              {/* ALLERGEN SELECTOR */}
              <div className="card border-0 shadow-sm rounded-4 mb-3">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">Allergens</h6>
                  {ALLERGEN_OPTIONS.map((a) => (
                    <div key={a} className="form-check mb-2">
                      <input
                        type="checkbox"
                        id={`allergen-${a}`}
                        className="form-check-input"
                        value={a}
                        checked={activeAllergens.includes(a)}
                        onChange={() => toggleAllergen(a)}
                      />
                      <label
                        htmlFor={`allergen-${a}`}
                        className="form-check-label text-capitalize"
                      >
                        {a}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
 
              {/* ACTIVE ALLERGENS */}
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">Active Allergens</h6>
                  {activeAllergens.length === 0 ? (
                    <small className="text-muted">No allergens selected.</small>
                  ) : (
                    <div className="d-flex flex-wrap gap-2">
                      {
                        activeAllergens.map((a) => (
                            <span key={a} className="badge bg-danger rounded-pill px-3 py-2">
                            {a}
                            </span>
                        ))
                      }
                    </div>
                  )}
                </div>
              </div>
 
            </div>
 
            {/* PRODUCTS AREA */}
            <div className="col-lg-9">
 
              {/* CATEGORY FILTER */}
              <div className="bg-white rounded-4 shadow-sm p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <h5 className="fw-bold m-0">
                    Products ({filteredProducts.length})
                  </h5>
                  <select
                    className="form-select"
                    style={{ maxWidth: "220px" }}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
 
              {/* PRODUCT GRID */}
              <div className="row g-3">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <div key={p._id} className="col-xl-4 col-md-6">
                      <ProductCard product={p} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center text-muted py-5">
                    No products match your filters.
                  </div>
                )}
              </div>
 
            </div>
          </div>
        </div>
      </div>
 
      <Footer />
    </>
  );
}
 
