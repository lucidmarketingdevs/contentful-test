import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './post-preview.module.css'

const PostPreview = ({ post }) => {
  return (
    <div className={styles.preview}>
      <Link to={post.slug}>
        <Img alt={post.title} fluid={post.heroImage.fluid} />
      </Link>
      <div className={styles.previewContent}>
        <Link to={post.slug} className={styles.previewTitleLink}>
          <h2 className={styles.previewTitle}>{post.title}</h2>
        </Link>
        <p className={styles.previewAuthor}>Posted by: {post.author.name}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: post.description.childMarkdownRemark.html,
          }}
        />
        <Link to={post.slug} className={styles.previewLink}>
          Read more
        </Link>
      </div>
    </div>
  )
}

export default PostPreview
