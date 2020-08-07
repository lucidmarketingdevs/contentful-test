import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout'
import ContentWrap from '../components/content-wrap/content-wrap'
import Post from '../components/post/post'
import Sidebar from '../components/sidebar/sidebar'

const BlogPostTemplate = ({ data, location }) => {
  const {
    contentfulBlogPost: post,
    site: {
      siteMetadata: { title: siteTitle },
    },
  } = data

  return (
    <Layout location={location}>
      <Helmet title={`${post.title} | ${siteTitle}`} />
      <ContentWrap>
        <Post post={post} />
        <Sidebar />
      </ContentWrap>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      author {
        name
        title
        shortBio {
          shortBio
        }
        image {
          fluid(maxWidth: 786, background: "rgb:000000") {
            ...GatsbyContentfulFluid_tracedSVG
          }
        }
      }
    }
  }
`
