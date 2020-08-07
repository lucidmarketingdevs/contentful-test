import React, { useState } from 'react'
import { Link } from 'gatsby'

import navStyles from '../nav/nav.module.css'
import styles from './nav-dropdown.module.css'

const NavDropdown = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li
      key={link.id}
      className={[
        navStyles.navItem,
        styles.dropdown,
        isOpen && styles.dropdownOpen,
      ].join(' ')}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {link.text}
      <ul className={[styles.submenu, isOpen && styles.submenuOpen].join(' ')}>
        {link.links.map(({ node }) => (
          <li key={node.categoryId} className={styles.submenuItem}>
            <Link
              to={node.categoryId}
              className={[navStyles.navLink, styles.submenuLink].join(' ')}
            >
              {node.categoryName}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default NavDropdown
