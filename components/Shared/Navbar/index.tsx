import React from 'react'
import AuthButtons from '../auth/AuthButtons'

const Navbar = () => {
  return (
    <div className='fixed top-5 right-5' >
        <AuthButtons />
    </div>
  )
}

export default Navbar