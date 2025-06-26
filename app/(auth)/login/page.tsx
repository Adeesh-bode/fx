"use client";

import LogInPage from '@/feature/Pagewise/Auth/Login';
import SignUpPage from '@/feature/Pagewise/Auth/SignUp';
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
      <LogInPage />
    </Suspense>
  )
}

export default page