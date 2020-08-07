import React from 'react'

import PoplarList from '../popular-list/popular-list'
import About from '../about/about'
import SidebarBox from '../sidebar-box/sidebar-box'
import styles from './sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <SidebarBox>
        <PoplarList />
      </SidebarBox>

      <SidebarBox>
        <About />
      </SidebarBox>
    </div>
  )
}

export default Sidebar
