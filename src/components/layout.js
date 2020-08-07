import React from 'react'
import Container from './container/container'
import Nav from './nav/nav'

import './base.css'
import Footer from './footer/footer'

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}

export default Layout
