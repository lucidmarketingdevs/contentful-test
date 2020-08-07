import React from 'react'

import styles from './container.module.css'

const Container = ({ flex, children }) => {
  return (
    <div className={[styles.container, flex && styles.containerFlex].join(' ')}>
      {children}
    </div>
  )
}

export default Container
