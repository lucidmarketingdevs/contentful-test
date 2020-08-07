import React from 'react'

import styles from './content-wrap.module.css'

const ContentWrap = ({ children }) => {
  return <div className={styles.contentWrap}>{children}</div>
}

export default ContentWrap
