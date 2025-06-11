'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import './style.scss';
import FilterPane from './FilterPane';
import ProductCard from './ProductCard';

export default function StoreSection() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  const gender = searchParams.get('gender');
  const category = searchParams.get('category');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products?gender=${gender}&category=${category}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    }

    if (gender && category) {
      fetchProducts();
    }
  }, [gender, category]);

  return (
    <div className="store-container">
      <div className="store-header">
        <input
          type="text"
          placeholder="Search for items..."
          className="search-bar"
        />
        <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? <X /> : <Menu />}
        </button>
      </div>

      <div className="store-grid">
        {showFilters && (
          <aside className="filter-pane">
            <FilterPane />
          </aside>
        )}

        <main className="product-section">
          {products.length === 0 ? (
            <p className="empty-message">No products found.</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
