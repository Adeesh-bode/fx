import React from 'react';
import { X } from 'lucide-react';
import '../products.scss';

interface FilterPaneProps {
  isVisible: boolean;
  onToggle: () => void;
  selectedCategory: string;
  selectedGender: string;
  onCategoryChange: (category: string) => void;
  onGenderChange: (gender: string) => void;
}

const FilterPane: React.FC<FilterPaneProps> = ({
  isVisible,
  onToggle,
  selectedCategory,
  selectedGender,
  onCategoryChange,
  onGenderChange,
}) => {
  const categories = [
    'All Categories',
    'Clothing',
    'Shoes',
    'Accessories',
    'Bags',
    'Jewelry',
    'Books',
    'Electronics',
    'Home & Garden'
  ];

  const genders = [
    'All Genders',
    'Men',
    'Women',
    'Kids',
    'Unisex'
  ];

  // const conditions = [
  //   'Like New',
  //   'Excellent',
  //   'Good',
  //   'Fair'
  // ];

  // const priceRanges = [
  //   'Under $10',
  //   '$10 - $25',
  //   '$25 - $50',
  //   '$50 - $100',
  //   'Over $100'
  // ];

  return (
    <div className={`filter-sidebar ${!isVisible ? 'hidden' : ''}`}>
      <div className="filter-header">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-accent rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Category</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <div
              key={category}
              className={`filter-option ${selectedCategory === category ? 'selected' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Gender</h3>
        <div className="space-y-1">
          {genders.map((gender) => (
            <div
              key={gender}
              className={`filter-option ${selectedGender === gender ? 'selected' : ''}`}
              onClick={() => onGenderChange(gender)}
            >
              <span>{gender}</span>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="filter-section">
        <h3 className="filter-title">Condition</h3>
        <div className="space-y-1">
          {conditions.map((condition) => (
            <div key={condition} className="filter-option">
              <input type="checkbox" id={condition} className="rounded" />
              <label htmlFor={condition}>{condition}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Price Range</h3>
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <div key={range} className="filter-option">
              <input type="checkbox" id={range} className="rounded" />
              <label htmlFor={range}>{range}</label>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default FilterPane;