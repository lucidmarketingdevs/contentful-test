import React from 'react'
import Img from 'gatsby-image'

import styles from './author-info.module.css'

const AuthorInfo = ({ author }) => {
  return (
    <div className={styles.authorInfo}>
      <h2 className={styles.authorInfoTitle}>About the Author</h2>
      <div className={styles.authorInfoWrap}>
        <Img
          alt={`${author.name} | ${author.title}`}
          fluid={author.image.fluid}
          className={styles.authorImage}
        />
        <p>{author.shortBio.shortBio}</p>
      </div>
    </div>
  )
}

export default AuthorInfo
