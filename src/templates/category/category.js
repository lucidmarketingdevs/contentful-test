import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Layout from '../../components/layout'
import ContentWrap from '../../components/content-wrap/content-wrap'
import PostList from '../../components/post-list/post-list'
import Sidebar from '../../components/sidebar/sidebar'

import styles from './category.module.css'

const CategoryTemplate = ({ location, data, pageContext }) => {
  const { name, id, currentPage, totalPageCount } = pageContext
  const {
    allContentfulBlogPost: { edges: posts },
    site: {
      siteMetadata: { title: siteTitle },
    },
  } = data

  return (
    <Layout location={location}>
      <Helmet title={`${name} | ${siteTitle}`} />
      {name && <h3 className={styles.categoryTitle}>{name} Posts</h3>}
      <ContentWrap>
        <PostList
          posts={posts}
          pathRoot={id}
          currentPage={currentPage}
          totalPageCount={totalPageCount}
        />
        <Sidebar />
      </ContentWrap>
    </Layout>
  )
}

export default CategoryTemplate

export const pageQuery = graphql`
  query CategoryById($id: String!, $skip: Int, $limit: Int) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(
      sort: { fields: [createdAt], order: DESC }
      filter: { category: { elemMatch: { categoryId: { eq: $id } } } }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 786, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
          author {
            name
            title
          }
        }
      }
    }
  }
`
