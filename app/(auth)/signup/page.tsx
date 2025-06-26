"use client";

import SignUpPage from '@/feature/Pagewise/Auth/SignUp';
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
      <SignUpPage />
    </Suspense>
  )
}

export default page