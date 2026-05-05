import Link from "next/link";

const IMAGE_URL = "http://localhost:5000/";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="product-card">

        {product.image && (
          <img
            className="product-image"
            src={`${IMAGE_URL}${product.image}`}
            alt={product.name}
          />
        )}

        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price} JOD</p>

        <div>
          {product.allergens?.length > 0
            ? product.allergens.map((a, i) => (
                <span key={i} className="badge">{a}</span>
              ))
            : <span className="badge">No allergens</span>}
        </div>

      </div>
    </Link>
  );
}