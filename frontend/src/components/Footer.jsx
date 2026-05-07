"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="text-light mt-5 pt-4 pb-3"
      style={{
        background: "linear-gradient(90deg, #0f172a, #1e293b)",
      }}
    >
      <div className="container">

        <div className="row">

          {/* LOGO + DESCRIPTION */}
          <div className="col-md-4 mb-3">

            <div className="d-flex align-items-center gap-2 mb-2">
              <img
                src="/safebite_logo.png"
                alt="SafeBite"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "contain",
                }}
              />

              <h5 className="m-0 fw-bold">Safe Bite</h5>
            </div>

            <p className="text-secondary small">
              Discover safe and healthy food and drinks tailored for your lifestyle.
            </p>

          </div>

          {/* LINKS */}
          <div className="col-md-4 mb-3">

            <h6 className="fw-bold mb-3">Quick Links</h6>

            <ul className="list-unstyled">

              <li>
                <Link href="/" className="text-secondary text-decoration-none">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/products" className="text-secondary text-decoration-none">
                  Products
                </Link>
              </li>

              <li>
                <Link href="/about" className="text-secondary text-decoration-none">
                  About
                </Link>
              </li>

            </ul>

          </div>

          {/* CONTACT */}
          <div className="col-md-4 mb-3">

            <h6 className="fw-bold mb-3">Contact</h6>

            <p className="text-secondary small mb-1">
              Email: support@safebite.com
            </p>

            <p className="text-secondary small mb-1">
              Phone: +962 7XX XXX XXX
            </p>

            <p className="text-secondary small">
              Amman, Jordan
            </p>

          </div>

        </div>

        {/* BOTTOM LINE */}
        <hr className="border-secondary" />

        <div className="text-center text-secondary small">
          © {new Date().getFullYear()} Safe Bite. All rights reserved.
        </div>

      </div>
    </footer>
  );
}