"use client";

export default function SearchBar({ setSearch }) {
  return (
    <input
      className="form-control"
      placeholder="Search products..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}