'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Grid3x3 } from 'lucide-react';

import { useSearchParams, useRouter } from 'next/navigation';
import './products.scss';
import FilterPane from './FilterPane';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

interface Product {
  id: string;
  title: string;
  category: string;
  gender: string;
  price: number;
  originalPrice?: number;
  image?: string;
  condition: string;
}

// Dummy products data
const generateDummyProducts = (): Product[] => {
  const categories = ['Clothing', 'Shoes', 'Accessories', 'Bags', 'Jewelry', 'Books', 'Electronics', 'Home & Garden'];
  const genders = ['Men', 'Women', 'Kids', 'Unisex'];
  const conditions = ['Like New', 'Excellent', 'Good', 'Fair'];
  const items = [
    'Vintage Leather Jacket', 'Designer Handbag', 'Classic Sneakers', 'Silk Scarf', 'Wool Sweater',
    'Denim Jeans', 'Pearl Necklace', 'Vintage Watch', 'Designer Sunglasses', 'Cashmere Coat',
    'Leather Boots', 'Vintage Dress', 'Designer Belt', 'Silk Blouse', 'Wool Cardigan',
    'Canvas Sneakers', 'Gold Bracelet', 'Vintage Hat', 'Designer Shoes', 'Cotton T-Shirt',
    'Leather Purse', 'Vintage Jacket', 'Designer Jeans', 'Silk Tie', 'Wool Scarf',
    'Running Shoes', 'Silver Ring', 'Vintage Vest', 'Designer Shirt', 'Cotton Dress'
  ];

  return Array.from({ length: 120 }, (_, index) => ({
    id: `product-${index + 1}`,
    title: items[index % items.length],
    category: categories[Math.floor(Math.random() * categories.length)],
    gender: genders[Math.floor(Math.random() * genders.length)],
    price: Math.floor(Math.random() * 80) + 10,
    originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 100 : undefined,
    condition: conditions[Math.floor(Math.random() * conditions.length)],
  }));
};

const StoreSection: React.FC = () => {
const searchParams = useSearchParams();
const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedGender, setSelectedGender] = useState('All Genders');
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [products] = useState<Product[]>(generateDummyProducts());

  const itemsPerPage = 20;

  // Extract query parameters on component mount
  useEffect(() => {
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    
    if (category) {
      setSelectedCategory(category);
    }
    if (gender) {
      setSelectedGender(gender);
    }
  }, [searchParams]);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All Categories' || 
                             product.category === selectedCategory;
      
      const matchesGender = selectedGender === 'All Genders' || 
                           product.gender === selectedGender;

      return matchesSearch && matchesCategory && matchesGender;
    });
  }, [products, searchQuery, selectedCategory, selectedGender]);

  // Paginate filtered products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    
    const newParams = new URLSearchParams(searchParams);
    if (category !== 'All Categories') {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
      router.push(`?${newParams.toString()}`);
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
    setCurrentPage(1);
    
    const newParams = new URLSearchParams(searchParams);
    if (gender !== 'All Genders') {
      newParams.set('gender', gender);
    } else {
      newParams.delete('gender');
    }
  router.push(`?${newParams.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const toggleFilterSidebar = () => {
    console.log(isFilterVisible);
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="products-container">
      {/* Search Section */}
      <div className="search-section">
        <div className="search-bar">
          <div className="relative flex-1">
            {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" /> */}
            <input
              type="text"
              placeholder="Search for vintage clothes, accessories, books..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input pl-10"
            />
          </div>
          <button
            onClick={toggleFilterSidebar}
            className="filter-toggle-btn "
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Filter Sidebar */}
        <FilterPane
          isVisible={isFilterVisible}
          onToggle={toggleFilterSidebar}
          selectedCategory={selectedCategory}
          selectedGender={selectedGender}
          onCategoryChange={handleCategoryChange}
          onGenderChange={handleGenderChange}
        />

        {/* Products Section */}
        <div className="products-section">
          <div className="products-header">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Thrift Store</h1>
              <p className="results-count">
                {filteredProducts.length} products found
                {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
                {selectedGender !== 'All Genders' && ` for ${selectedGender}`}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Grid3x3 className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {paginatedProducts.length > 0 ? (
            <>
              <div className="products-grid">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="no-products">
              <p className="text-xl mb-2">No products found</p>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreSection;
