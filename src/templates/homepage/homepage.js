import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Layout from '../../components/layout'
import ContentWrap from '../../components/content-wrap/content-wrap'
import PostList from '../../components/post-list/post-list'
import Sidebar from '../../components/sidebar/sidebar'

const Homepage = ({ data, location, pageContext }) => {
  const { totalPageCount, currentPage } = pageContext
  const {
    siteTitle,
    allContentfulBlogPost: { edges: posts },
  } = data

  return (
    <Layout location={location}>
      <Helmet title={siteTitle} />
      <ContentWrap>
        <PostList
          posts={posts}
          currentPage={currentPage}
          totalPageCount={totalPageCount}
        />
        <Sidebar />
      </ContentWrap>
    </Layout>
  )
}

export default Homepage

export const pageQuery = graphql`
  query HomeQuery($skip: Int, $limit: Int) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(
      sort: { fields: [createdAt], order: DESC }
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
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
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
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
