import ProductDetails from "@/components/ProductDetails";

async function getProduct(id) {
  const res = await fetch(
    `http://localhost:5000/api/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function Page({ params }) {
  const { id } = await params;

  const product = await getProduct(id);

  return <ProductDetails product={product} />;
}