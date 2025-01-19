import React from 'react'
import styles from './styles.module.scss'
import { ProductCardProps } from '@/utils/interface/props';
import ProductCardContent from './ProductCardContent';



const ProductCard = ({ angle ,cardIndex ,color , hoverIndex , setHoveredIndex , clearHoveredIndex, data }: ProductCardProps) => {

  return (
    <div 
      className={styles.CardContainer} 
      onMouseEnter={setHoveredIndex}
      onMouseLeave={clearHoveredIndex}
      style={{ 
        backgroundColor: color,
        transform: `${cardIndex == hoverIndex ?'scale(1.2)' :'scale(1)'} rotate(${angle}deg)`, 
        opacity: `${cardIndex==hoverIndex || hoverIndex==0? 1 : 0.3}`, // Opacity low when not hovered
        transition: 'transform 0.5s ease, opacity 0.5s ease', 
        bottom: angle !== 0 ? `-25px` : '0px',
        // bottom: angle !== 0 ? `-${Math.abs(angle) * 4 }px` : '0px',
        // height: angle ===0? '380px': '360px',  
      }}
    >
      <ProductCardContent {...data} />    
    </div>
  );
};

export default ProductCard;
