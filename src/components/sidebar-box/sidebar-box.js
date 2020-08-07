import React from 'react'

import styles from './sidebar-box.module.css'

const SidebarBox = ({ children }) => {
  return <div className={styles.sidebarBox}>{children}</div>
}

export default SidebarBox
