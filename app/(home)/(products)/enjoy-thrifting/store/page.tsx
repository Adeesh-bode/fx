import StoreSection from '@/feature/Pagewise/ThriftStore/StoreSection'
import React, { Suspense } from 'react'

const StorePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoreSection />
    </Suspense>
  )
}

export default StorePage