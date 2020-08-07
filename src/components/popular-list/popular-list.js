import React, { useState } from 'react'
import { Link, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import styles from './popular-list.module.css'

const PopularList = () => {
  const data = useStaticQuery(
    graphql`
      {
        allContentfulBlogPost(limit: 3, filter: { tags: { in: "popular" } }) {
          edges {
            node {
              title
              slug
              heroImage {
                fluid(maxWidth: 270, maxHeight: 120, resizingBehavior: SCALE) {
                  ...GatsbyContentfulFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    `
  )

  const {
    allContentfulBlogPost: { edges: popularPosts },
  } = data
  return (
    <div className={styles.popularList}>
      <h2 className={styles.popularTitle}>Popular Now</h2>
      {popularPosts.map(({ node }, i) => {
        return (
          <div className={styles.popularEntry}>
            <Link to={node.slug} className={styles.popularLink}>
              {i === 0 && <Img fluid={node.heroImage.fluid} alt={node.title} />}
              <p>{node.title}</p>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default PopularList
