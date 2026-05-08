"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";

export default function SupplierDashboard() {
  const { user, token } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res1 = await fetch(
        "http://localhost:5000/api/supplier/my-products",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data1 = await res1.json();

      const res2 = await fetch(
        "http://localhost:5000/api/supplier/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data2 = await res2.json();

      setProducts(Array.isArray(data1) ? data1 : []);
      setStats(data2 || {});
    } catch (err) {
      toast.error("Error loading dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (!user || user.role !== "supplier") {
    return (
      <div className="text-center p-5">
        <h3>Access Denied</h3>
      </div>
    );
  }

  return (
    <div className="bg-light d-flex flex-column min-vh-100">

      {/* HEADER */}
      <div className="bg-white border-bottom">
        <div className="container py-3 d-flex justify-content-between align-items-center">

          <div>
            <h3 className="fw-bold mb-0">Supplier Dashboard</h3>
            <small className="text-muted">
              Manage your products easily
            </small>
          </div>

          <Link href="/add-product" className="btn btn-dark px-4">
            + Add Product
          </Link>

        </div>
      </div>

      {/* CONTENT */}
      <div className="container py-4 flex-grow-1">

        {/* STATS */}
        <div className="row mb-4">

          <div className="col-md-4">
            <div className="card shadow-sm border-0 text-center">
              <div className="card-body">
                <h6 className="text-muted">Total Products</h6>
                <h2 className="fw-bold">
                  {stats?.totalProducts || 0}
                </h2>
              </div>
            </div>
          </div>

        </div>

        {/* PRODUCTS */}
        <div className="row g-4">

          {loading
            ? [...Array(6)].map((_, i) => (
                <div key={i} className="col-md-4">
                  <div className="card shadow-sm border-0">
                    <div className="bg-secondary" style={{ height: "180px" }}></div>
                    <div className="card-body">
                      <div className="placeholder col-6 mb-2"></div>
                      <div className="placeholder col-4"></div>
                    </div>
                  </div>
                </div>
              ))
            : products.map((p) => (
                <div key={p._id} className="col-md-4">

                  <div className="card shadow-sm border-0 h-100 position-relative">

                    {/* IMAGE */}
                    <img
                      src={`http://localhost:5000/${p.image}`}
                      className="card-img-top"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />

                    {/* CATEGORY BADGE */}
                    <span className="badge bg-dark position-absolute m-2">
                      {p.category}
                    </span>

                    {/* BODY */}
                    <div className="card-body">

                      <h5 className="fw-bold">{p.name}</h5>

                      <p className="text-muted mb-3">
                        {p.price} JOD
                      </p>

                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-outline-dark btn-sm w-50"
                          onClick={() =>
                            router.push(`/edit-product/${p._id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm w-50"
                          onClick={() => handleDelete(p._id)}
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}