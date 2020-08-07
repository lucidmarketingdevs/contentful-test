import React from 'react'

import PostPreview from '../post-preview/post-preview'
import Pagination from '../pagination/pagination'

import styles from './post-list.module.css'

const PostList = ({ posts, pathRoot, currentPage, totalPageCount }) => {
  return (
    <div className={styles.postList}>
      {posts.map(({ node }) => {
        return <PostPreview key={node.slug} post={node} />
      })}

      <Pagination
        pathRoot={pathRoot}
        currentPage={currentPage}
        totalPageCount={totalPageCount}
      />
    </div>
  )
}

export default PostList
