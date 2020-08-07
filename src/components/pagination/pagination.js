import React from 'react'
import { Link } from 'gatsby'

import styles from './pagination.module.css'

const Pagination = ({ pathRoot, currentPage, totalPageCount }) => {
  const totalPages = []
  for (let i = 1; i <= totalPageCount; i++) {
    totalPages.push(i)
  }

  if (totalPages.length < 1) {
    return null
  }

  const minLength = 5
  const calculatedEndIndex = currentPage + 2
  const endIndex =
    calculatedEndIndex >= minLength ? calculatedEndIndex : minLength
  const endDifference = endIndex - totalPageCount
  const extraStart = endDifference > 0 ? endDifference : 0
  const calculatedStartIndex = currentPage - 3 - extraStart
  const startIndex = calculatedStartIndex >= 0 ? calculatedStartIndex : 0
  const visiblePages = totalPages.slice(startIndex, endIndex)

  return (
    <div className={styles.pagination}>
      {visiblePages[0] > 1 && (
        <Link to={pathRoot ? pathRoot : '/'} className={styles.paginationItem}>
          First
        </Link>
      )}
      {currentPage !== 1 && (
        <Link
          to={
            pathRoot
              ? pathRoot
              : `${currentPage - 1 === 1 ? '/' : `/page${currentPage - 1}`}`
          }
          className={styles.paginationItem}
        >
          ←
        </Link>
      )}
      {visiblePages.map((page) => (
        <Link
          key={page}
          className={[
            styles.paginationItem,
            currentPage === page ? styles.paginationItemActive : null,
          ].join(' ')}
          to={`${pathRoot ? pathRoot : ''}${page > 1 ? `/page${page}` : ''}`}
        >
          {page}
        </Link>
      ))}
      {currentPage !== totalPageCount && (
        <Link
          to={`${pathRoot ? pathRoot : ''}/page${currentPage + 1}`}
          className={styles.paginationItem}
        >
          →
        </Link>
      )}
      {visiblePages[visiblePages.length - 1] < totalPageCount && (
        <Link
          to={`${pathRoot ? pathRoot : ''}/page${totalPageCount}`}
          className={styles.paginationItem}
        >
          Last
        </Link>
      )}
    </div>
  )
}

export default Pagination
