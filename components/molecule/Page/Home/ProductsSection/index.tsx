'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'

import ProductCard from '@/components/atom/Cards/ProductCard'
import productCardDetails from '@/utils/constants/products'
import { ProductCardI } from '@/utils/interface/shared'
import Image from 'next/image'

const ProductsSection = () => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(0)

	return (
		<div className={styles.container}>
			{/* <div className='container'>
				<Image
					src={RocketBg}
					alt='Infigon Rocket'
					layout='fill'
					objectFit='contain'
					className='absolute inset-0 p-20'
				/>
			</div> */}
			<h2 className={styles.label}>
				<span>
					India&apos;s 1<sup>st</sup>
				</span>
				<span>AI Powered</span>
				<Image src={'/icons/electric_bolt.svg'} alt='Electric Bolt' width={40} height={40} />
			</h2>
			<div className={styles.content}>
				<h1 className={styles.heading}>FashionX</h1>
				<h3 className={styles.description}>A sustainable platform for your daily fashion needs</h3>
			</div>
			<div className={styles.allproducts}>
				{productCardDetails.map((product: ProductCardI) => (
					<ProductCard
						key={product.id} // Use a unique key for each card
						angle={product.angle}
						cardIndex={product.cardIndex}
						color={product.data.color}
						setHoveredIndex={() => setHoveredIndex(product.cardIndex)}
						hoverIndex={hoveredIndex}
						clearHoveredIndex={() => setHoveredIndex(0)}
						data={product.data}
					/>
				))}
			</div>
		</div>
	)
}

export default ProductsSection
