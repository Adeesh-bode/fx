import React from 'react'
import AuthButtons from '../auth/AuthButtons'
import styles from './styles.module.scss'
const Navbar = () => {
  return (
    <div className={styles.navbar}>
        <AuthButtons />
    </div>
  )
}

export default Navbar