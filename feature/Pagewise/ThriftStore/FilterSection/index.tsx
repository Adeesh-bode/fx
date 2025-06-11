'use client'
import { useState } from "react";
import { RotateCcw, Filter } from "lucide-react";
import { Shirt, Footprints, Watch, Glasses, Heart, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

import "./style.scss";

const categoryOptions = [
  { id: "clothing", label: "Clothing", icon: Shirt, description: "Shirts, dresses, jackets, pants" },
  { id: "footwear", label: "Footwear", icon: Footprints, description: "Shoes, boots, sneakers, sandals" },
  { id: "accessories", label: "Accessories", icon: Watch, description: "Watches, jewelry, belts, scarves" },
  { id: "eyewear", label: "Eyewear", icon: Glasses, description: "Sunglasses, reading glasses, frames" },
  { id: "bags", label: "Bags & Purses", icon: Heart, description: "Handbags, backpacks, wallets, clutches" },
  { id: "vintage", label: "Vintage & Designer", icon: Zap, description: "Unique vintage finds & designer pieces" },
];

const genderOptions = [
  { id: "male", label: "Men's", icon: "👨", description: "Shirts, pants, jackets & more" },
  { id: "female", label: "Women's", icon: "👩", description: "Dresses, tops, skirts & more" },
  { id: "unisex", label: "Unisex", icon: "👤", description: "Suitable for everyone" },
];

export default function ThriftSection() {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useRouter();

  const handleClear = () => {
    setSelectedGender(null);
    setSelectedCategory(null);
  };

  const handleApply = () => {
    if (selectedGender && selectedCategory) {
      navigate.push(`/enjoy-thrifting/store?gender=${selectedGender}&&category=${selectedCategory}`);
    }
  };

  return (
    <div className="filter-container">
      <div className="inner-container">
        <h2 className="filter-title">Find Your Perfect Thrift</h2>
        <p className="filter-subtitle">
          Discover unique fashion pieces that match your style. Filter by gender and categories to find exactly what you're looking for.
        </p>

        <div className="filter-grid">
          {/* Gender */}
          <div className="filter-column">
            <div className="filter-header">
              <Filter className="icon" />
              <h3>Gender</h3>
            </div>
            {genderOptions.map((option) => (
              <div
                key={option.id}
                className={`filter-card ${selectedGender === option.id ? "selected-card" : ""}`}
                onClick={() => setSelectedGender(option.id)}
              >
                <span className="emoji">{option.icon}</span>
                <div>
                  <p className="card-title">{option.label}</p>
                  <p className="card-desc">{option.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Category */}
          <div className="filter-column">
            <div className="filter-header">
              <Filter className="icon" />
              <h3>Categories</h3>
            </div>
            <div className="category-grid">
              {categoryOptions.map(({ id, label, icon: Icon, description }) => (
                <div
                  key={id}
                  className={`filter-card ${selectedCategory === id ? "selected-card" : ""}`}
                  onClick={() => setSelectedCategory(id)}
                >
                  <Icon className="icon" />
                  <div>
                    <p className="card-title">{label}</p>
                    <p className="card-desc">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="filter-actions">
          <button className="clear-btn" onClick={handleClear}>
            <RotateCcw className="icon" />
            Clear Filters
          </button>
          <button className="apply-btn" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
