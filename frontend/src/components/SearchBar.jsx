"use client";

export default function SearchBar({ setSearch }) {
  return (
    <input
      className="search-input"
      placeholder="Search products..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}