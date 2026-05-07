"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm"
      style={{
        background: "linear-gradient(90deg, #0f172a, #1e293b)",
      }}
    >
      {/* wider navbar */}
      <div className="container-fluid px-4">
        {/* LOGO LEFT */}
        <Link
          href="/"
          className="navbar-brand d-flex align-items-center m-0"
          style={{ gap: "12px" }} // 👈 spacing between image & text
        >
          <img
            src="/safebite_logo.png"
            alt="SafeBite"
            style={{
              width: "108px",
              height: "108px",
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

        {/* CONTENT */}
        <div className="collapse navbar-collapse" id="nav">
          {/* CENTER LINKS */}
          <ul className="navbar-nav mx-auto gap-3">
            <li className="nav-item">
              <Link className="nav-link text-light" href="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-light" href="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-light" href="/about">
                About
              </Link>
            </li>
          </ul>

          {/* RIGHT BUTTONS */}
          <div className="d-flex gap-2">
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
          </div>
        </div>
      </div>
    </nav>
  );
}
