import React from 'react'
import styles from './style.module.scss'
const WUP = ({content="Work Under Progress!"}: {content?: string}) => {
  return (
    <div className={styles.container}>
        <h1>{content}</h1>
    </div>
  )
}

export default WUP