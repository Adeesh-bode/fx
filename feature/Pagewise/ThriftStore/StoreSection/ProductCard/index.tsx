"use client"
import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import '../products.scss';
import { useRouter } from 'next/navigation';

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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  return (
    <div className="product-card group" onClick={()=> router.push(`/thrifting/store/${product.id}`)}>
      <div className="product-image relative">
        <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-background rounded-full shadow-md hover:bg-accent">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2 bg-background rounded-full shadow-md hover:bg-accent">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-md">
            {product.condition}
          </span>
        </div>
        {product.image ? (
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            👕
          </div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category} • {product.gender}</p>
        <div className="flex items-center">
          <span className="product-price">${product.price}</span>
          {product.originalPrice && (
            <span className="product-original-price">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
