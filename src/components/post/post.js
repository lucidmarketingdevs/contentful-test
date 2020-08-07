import React from 'react'
import Img from 'gatsby-image'

import styles from './post.module.css'
import AuthorInfo from '../author-info/author-info'

const Post = ({ post }) => {
  return (
    <div className={styles.post}>
      <Img alt={post.title} fluid={post.heroImage.fluid} />
      <div className={styles.postContent}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postAuthor}>Posted by: {post.author.name}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        />
      </div>

      <AuthorInfo author={post.author} />
    </div>
  )
}

export default Post
