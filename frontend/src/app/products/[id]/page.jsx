"use client";

import { useEffect, useState } from "react";
import API from "@/app/api";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    if (id) getProduct();
  }, [id]);

  if (!product) {
    return <div className="p-5">Loading...</div>;
  }

  return <ProductDetails product={product} />;
}