export default function ProductCard({ data }) {
  return (
    <div className="product-card">
      <img src={data.image} alt={data.name} className="product-image" />
      <div className="product-info">
        <h4 className="product-name">{data.name}</h4>
        <p className="product-price">${data.price}</p>
      </div>
    </div>
  );
}
