"use client";

import { useEffect, useState } from "react";
import API from "@/app/api";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ProductsPage() {
  const { user, setUser } = useAuth();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const searchParams = useSearchParams();
  const memberFromUrl = searchParams.get("member");

  const [selectedMember, setSelectedMember] =
    useState(memberFromUrl || "me");

  const ALLERGEN_OPTIONS = [
    "milk",
    "eggs",
    "peanuts",
    "gluten",
    "soy",
    "fish",
    "nuts",
  ];

  const [selectedAllergies, setSelectedAllergies] =
    useState([]);

  // ================= GET PRODUCTS =================
  const getProducts = async (query = "") => {
    try {
      const res = await API.get(
        `/products?search=${query}`
      );

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts(search);
  }, [search]);

  // ================= CURRENT MEMBER =================
  const currentMember =
    selectedMember === "me"
      ? { allergies: user?.allergens || [] }
      : user?.dependent?.find(
          (m) => m._id === selectedMember
        ) || {
          allergies: [],
        };

  // ================= TOGGLE ALLERGY =================
  const toggleAllergy = (item) => {
    setSelectedAllergies((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  // ================= ADD ALLERGY =================
  const handleAddAllergy = () => {
    if (selectedAllergies.length === 0) return;

    setUser((prev) => {
      if (!prev) return prev;

      // ME
      if (selectedMember === "me") {
        return {
          ...prev,
          allergens: Array.from(
            new Set([
              ...(prev.allergens || []),
              ...selectedAllergies,
            ])
          ),
        };
      }

      // DEPENDENT
      return {
        ...prev,
        dependent: prev.dependent.map((d) =>
          d._id === selectedMember
            ? {
                ...d,
                allergies: Array.from(
                  new Set([
                    ...(d.allergies || []),
                    ...selectedAllergies,
                  ])
                ),
              }
            : d
        ),
      };
    });

    setSelectedAllergies([]);
  };

  // ================= FILTER PRODUCTS =================
  const filteredProducts = products
    .filter((p) => {
      const blocked =
        currentMember?.allergies || [];

      return !p.allergens?.some((a) =>
        blocked.includes(a)
      );
    })
    .filter((p) => {
      if (selectedCategory === "all")
        return true;

      return p.category === selectedCategory;
    });

  return (
    <>
      <Navbar />

      <div
        className="min-vh-100 py-3"
        style={{
          background:
            "linear-gradient(to bottom right, #f8f9fa, #eef2ff)",
        }}
      >
        <div className="container-fluid">

          {/* TOP BAR */}
          <div className="bg-white rounded-4 shadow-sm p-3 mb-3">

            <div className="row align-items-center g-2">

              <div className="col-lg-6 d-flex gap-2 flex-wrap">

                <Link
                  href="/products"
                  className="btn btn-dark rounded-pill px-3"
                >
                  Products
                </Link>

                <Link
                  href="/cart"
                  className="btn btn-outline-dark rounded-pill px-3"
                >
                  Cart
                </Link>

                <Link
                  href="/favorites"
                  className="btn btn-outline-danger rounded-pill px-3"
                >
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

                  <h6 className="fw-bold mb-3">
                    Members
                  </h6>

                  <div
                    className={`p-2 rounded-3 text-center mb-2 ${
                      selectedMember === "me"
                        ? "bg-dark text-white"
                        : "bg-light"
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setSelectedMember("me")
                    }
                  >
                    Me
                  </div>

                  {user?.dependent?.map((m) => (
                    <div
                      key={m._id}
                      className={`p-2 rounded-3 text-center mb-2 ${
                        selectedMember === m._id
                          ? "bg-dark text-white"
                          : "bg-light"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setSelectedMember(m._id)
                      }
                    >
                      {m.name}
                    </div>
                  ))}

                </div>
              </div>

              {/* ADD ALLERGY */}
              <div className="card border-0 shadow-sm rounded-4 mb-3">
                <div className="card-body">

                  <h6 className="fw-bold mb-3">
                    Add Allergy
                  </h6>

                  {ALLERGEN_OPTIONS.map((a) => (
                    <div
                      key={a}
                      className="form-check mb-2"
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedAllergies.includes(
                          a
                        )}
                        onChange={() =>
                          toggleAllergy(a)
                        }
                      />

                      <label className="form-check-label text-capitalize">
                        {a}
                      </label>
                    </div>
                  ))}

                  <button
                    className="btn btn-dark w-100 rounded-pill mt-2"
                    onClick={handleAddAllergy}
                  >
                    Add Selected
                  </button>

                </div>
              </div>

              {/* ACTIVE ALLERGIES */}
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body">

                  <h6 className="fw-bold mb-3">
                    Active Allergens
                  </h6>

                  {(currentMember?.allergies || [])
                    .length === 0 ? (
                    <small className="text-muted">
                      No allergens selected
                    </small>
                  ) : (
                    <div className="d-flex flex-wrap gap-2">
                      {currentMember.allergies.map(
                        (a, i) => (
                          <span
                            key={i}
                            className="badge bg-danger rounded-pill px-3 py-2"
                          >
                            {a}
                          </span>
                        )
                      )}
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-9">

              {/* FILTER */}
              <div className="bg-white rounded-4 shadow-sm p-3 mb-3">

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

                  <h5 className="fw-bold m-0">
                    Products (
                    {filteredProducts.length})
                  </h5>

                  <select
                    className="form-select"
                    style={{ maxWidth: "220px" }}
                    onChange={(e) =>
                      setSelectedCategory(
                        e.target.value
                      )
                    }
                  >
                    <option value="all">
                      All Categories
                    </option>

                    <option value="food">
                      Food
                    </option>

                    <option value="drinks">
                      Drinks
                    </option>

                    <option value="snacks">
                      Snacks
                    </option>
                  </select>

                </div>
              </div>

              {/* PRODUCTS */}
              <div className="row g-3">

                {filteredProducts.map((p) => (
                  <div
                    key={p._id}
                    className="col-xl-4 col-md-6"
                  >
                    <ProductCard product={p} />
                  </div>
                ))}

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}