"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const hiddenRoutes = ["/login", "/register"];
  if (hiddenRoutes.includes(pathname)) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm"
      style={{
        background: "linear-gradient(90deg, #0f172a, #1e293b)",
      }}
    >
      <div className="container-fluid px-4">

        {/* LOGO */}
        <Link
          href="/"
          className="navbar-brand d-flex align-items-center m-0"
          style={{ gap: "12px" }}
        >
          <img
            src="/safebite_logo.png"
            alt="SafeBite"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
            }}
          />
          <span className="fw-bold text-white fs-3">Safe Bite</span>
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">

          {/* CENTER LINKS */}
          <ul className="navbar-nav mx-auto gap-3">

            <li className="nav-item">
              <Link className="nav-link text-light" href="/"
                style={{ fontSize: "1.1rem" }}
              >
                Home
              </Link>
            </li>

            {/* ❗ Products فقط إذا user مسجل ومش supplier */}
            {user && user.role !== "supplier" && (
            <>              
            <li className="nav-item">
                <Link className="nav-link text-light " href="/welcome"
                 style={{ fontSize: "1.1rem" }}
                >
                  Members
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light " href="/cart"
                 style={{ fontSize: "1.1rem" }}
                >
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light " href="/favorites"
                 style={{ fontSize: "1.1rem" }}
                >
                  favorites
                </Link>
              </li>
            </>

            )}

            <li className="nav-item">
              <Link className="nav-link text-light" href="/about"
               style={{ fontSize: "1.1rem" }}
              >
                About
              </Link>
            </li>

            {/* Dashboard فقط supplier */}
            {user?.role === "supplier" && (
              <li className="nav-item">
                <Link className="nav-link text-light" href="/supplier"
                 style={{ fontSize: "1.1rem" }}
                >
                  Dashboard
                </Link>
              </li>
            )}

          </ul>

          {/* RIGHT SIDE */}
          <div className="d-flex gap-2 align-items-center">

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="btn btn-light btn-sm rounded-pill px-3"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="btn btn-outline-light btn-sm rounded-pill px-3"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-light small me-2">
                  {user.firstName}
                </span>

                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm rounded-pill px-3"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}