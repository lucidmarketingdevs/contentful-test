import React, { useState, useEffect } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import throttle from 'lodash.throttle'

import Container from '../container/container'
import NavDropdown from '../nav-dropdown/nav-dropdown'

import styles from './nav.module.css'

const Nav = () => {
  const data = useStaticQuery(
    graphql`
      {
        allContentfulPostCategory {
          edges {
            node {
              categoryName
              categoryId
            }
          }
        }
      }
    `
  )

  const categories = data.allContentfulPostCategory.edges
  const topLevelLinks = [
    {
      type: 'dropdown',
      links: categories,
      text: 'Categories',
      id: 'categories',
    },
    {
      type: 'external',
      to: 'https://www.lucidchart.com/users/registerLevel?type=blog',
      text: 'Try it free',
      id: 'try-free',
    },
    {
      type: 'internal',
      to: '/education',
      text: 'Education',
      id: 'edu',
    },
  ]

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.pageYOffset > 40)
    }, 100)

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav role="navigation" className={styles.nav}>
      <Container>
        <div
          className={[
            styles.navContent,
            isScrolled && styles.navContentScrolled,
          ].join(' ')}
        >
          <div className={styles.navBrand}>
            <Link to="/">
              <img
                src="https://d2slcw3kip6qmk.cloudfront.net/marketing/images/LucidLogo_Website.svg"
                alt="brand logo"
              />
            </Link>
          </div>
          <ul className={styles.navMenu}>
            {topLevelLinks.map((link) => {
              if (link.type === 'external') {
                return (
                  <li key={link.id} className={styles.navItem}>
                    <a href={link.to} className={styles.navLink}>
                      {link.text}
                    </a>
                  </li>
                )
              } else if (link.type === 'internal') {
                return (
                  <li key={link.id} className={styles.navItem}>
                    <Link to={link.to} className={styles.navLink}>
                      {link.text}
                    </Link>
                  </li>
                )
              } else if (link.type === 'dropdown') {
                return <NavDropdown key={link.id} link={link} />
              }
            })}
          </ul>
        </div>
      </Container>
    </nav>
  )
}

export default Nav
