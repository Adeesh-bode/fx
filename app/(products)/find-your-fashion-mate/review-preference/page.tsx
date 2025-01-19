import Link from 'next/link'
import React from 'react'

const ReviewPreference = () => {
  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center'>
        ReviewPreference
        <Link href="/find-your-fashion-mate/right-swipe">
          <button className="bg-transparent border-2 border-gray-500 text-black px-3 py-1 rounded-xl text-lg md:text-xl lg:text-2xl ">
            Let&apos;s Go
          </button>
        </Link>
    </main>
  )
}

export default ReviewPreference