export default function ProductDetails({ product }) {
  return (
    <div className="details-container">

      {/* IMAGE */}
      <div>
        <img
          className="details-image"
          src={`http://localhost:5000/${product.image}`}
          alt={product.name}
        />
      </div>

      {/* INFO */}
      <div className="details-info">

        <h1 className="details-title">{product.name}</h1>

        <p className="details-price">{product.price} JOD</p>

        <p className="details-text">
          <b>Description:</b> {product.description}
        </p>

        <p className="details-text">
          <b>Stock:</b> {product.stock}
        </p>

        <p className="details-text">
          <b>Category:</b> {product.category}
        </p>

        {/* ALLERGENS */}
        <div className="details-section">
          <h3>Allergens</h3>
          <div>
            {product.allergens?.length > 0 ? (
              product.allergens.map((a, i) => (
                <span key={i} className="badge">{a}</span>
              ))
            ) : (
              <span className="badge">None</span>
            )}
          </div>
        </div>

        {/* FREE FROM */}
        <div className="details-section">
          <h3>Free From</h3>
          <div>
            {product.freeFrom?.length > 0 ? (
              product.freeFrom.map((f, i) => (
                <span key={i} className="badge">{f}</span>
              ))
            ) : (
              <span className="badge">None</span>
            )}
          </div>
        </div>

        {/* BUTTON (future use) */}
        <button className="details-btn">
          Add to Cart
        </button>

      </div>
    </div>
  );
}