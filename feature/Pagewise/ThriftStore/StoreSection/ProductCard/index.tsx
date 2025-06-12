import './style.scss';

export default function ProductCard({ data }) {
  return (
    <div className="product-card">
      <div className="product-img" />
      <div className="product-info">
        <p className="product-category">{data.category.toUpperCase()}</p>
        <h3 className="product-title">{data.title}</h3>
        <div className="product-price">
          <span className="current-price">${data.price}</span>
          <span className="original-price">${data.originalPrice}</span>
          <span className="discount">{data.discount}</span>
        </div>
        <button className="add-btn">Add to Cart</button>
      </div>
    </div>
  );
}
