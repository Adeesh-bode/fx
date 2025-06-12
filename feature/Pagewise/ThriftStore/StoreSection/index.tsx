'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import './style.scss';
import ProductCard from './ProductCard';
import FilterPane from './FilterPane';

const dummyProducts = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  category: i % 2 === 0 ? 'Clothing' : 'Accessories',
  price: (10 + i * 3).toFixed(2),
  originalPrice: (20 + i * 3).toFixed(2),
  discount: `${(100 - ((10 + i * 3) / (20 + i * 3)) * 100).toFixed(0)}%`,
  rating: (Math.random() * 5).toFixed(1),
}));

export default function StoreSection() {
  const searchParams = useSearchParams();
  const gender = searchParams.get('gender');
  const category = searchParams.get('category');

  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="store-layout">
      {showFilters && (
        <aside className="filter-pane">
          <FilterPane />
        </aside>
      )}

      <main className="main-content">
        <header className="store-header">
          <input
            type="text"
            placeholder="Search for products..."
            className="search-bar"
          />
          <button className="toggle-filter-btn" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        <div className="product-grid">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
