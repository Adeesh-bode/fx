import ProductsSection from '@/components/molecule/Page/Home/ProductsSection'
import React from 'react'

const Home = () => {
	return (
		<div className='flex flex-col w-screen h-full overflow-hidden'>
			{/* <Navbar /> */}
			<ProductsSection />
		</div>
	)
}

export default Home
