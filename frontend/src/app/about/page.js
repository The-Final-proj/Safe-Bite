"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>


      <div className="min-vh-100 py-5" style={{ background: "#f8f9fa" }}>
        <div className="container">

          {/* HERO */}
          <div className="text-center mb-5">
            <h1 className="fw-bold">About Safe Bite</h1>
            <p className="text-muted mt-2">
              A smart food platform built for transparency, safety, and personalized allergy awareness.
            </p>
          </div>

          {/* PLATFORM */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h4 className="fw-bold mb-2">What is Safe Bite?</h4>
            <p className="text-muted mb-0">
              Safe Bite is a smart marketplace where every product includes clear and detailed allergen information.
              Instead of hiding products, the platform focuses on transparency so users can make safe and informed decisions.
            </p>
          </div>

          {/* SUPPLIER SIDE */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h4 className="fw-bold mb-2">For Suppliers</h4>
            <p className="text-muted mb-0">
              Suppliers can add their products along with full ingredient and allergen details.
              This ensures customers clearly understand what each product contains, increasing trust and product accuracy.
            </p>
          </div>

          {/* USER SIDE */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h4 className="fw-bold mb-2">For Users</h4>
            <p className="text-muted mb-0">
              Users can explore all available products while the system highlights allergens and safety risks.
              Products are automatically filtered based on user allergies to reduce health risks and improve safety.
            </p>
          </div>

          {/* MEMBERS */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h4 className="fw-bold mb-2">Family Members System</h4>
            <p className="text-muted mb-0">
              Users can manage multiple family members, each with their own allergy profile.
              This allows personalized safety filtering for every individual within the same account.
            </p>
          </div>

          {/* GOAL */}
          <div className="text-center mt-5">
            <h5 className="fw-bold">Our Goal</h5>
            <p className="text-muted">
              To create a transparent food system where safety information is always visible and personalized for every user.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}