exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const categoryResults = await graphql(
    `
      {
        site {
          siteMetadata {
            postsPerPage
          }
        }
        allContentfulPostCategory {
          edges {
            node {
              categoryName
              categoryId
            }
          }
        }
      }
    `
  )

  if (!categoryResults) {
    console.log('no categories found')
  }

  const {
    data: {
      allContentfulPostCategory: { edges: categories },
      site: {
        siteMetadata: { postsPerPage },
      },
    },
  } = categoryResults

  const mainPostQuery = `
    {
      allContentfulBlogPost(limit: 10000) {
        totalCount
        edges {
          node {
            title
            slug
          }
        }
      }
      ${categories.map(
        ({ node }) =>
          `
            ${node.categoryId}: allContentfulBlogPost(
              limit: 1000
              filter: { category: { elemMatch: { categoryId: { eq: "${node.categoryId}" } } } }
            ) { totalCount }
          `
      )}
    }
  `

  const postResults = await graphql(mainPostQuery)

  if (!postResults) {
    console.log('error in main post query')
  }

  const {
    data: {
      allContentfulBlogPost: { totalCount: allPostsTotalCount, edges: posts },
    },
  } = postResults

  const createCategoryPages = (
    { categoryId, categoryName },
    totalCategoryPageCount,
    template
  ) => {
    const pages = Math.ceil(totalCategoryPageCount / postsPerPage)
    for (i = 1; i <= pages; i++) {
      createPage({
        path: `${categoryId}/${i > 1 ? `page${i}` : ''}`,
        component: template,
        context: {
          name: categoryName,
          id: categoryId,
          skip: postsPerPage * (i - 1),
          limit: postsPerPage,
          currentPage: i,
          totalPageCount: pages,
        },
      })
    }
  }

  // create home page and pagination pages
  const indexTemplate = `${__dirname}/src/templates/homepage/homepage.js`
  createCategoryPages(
    { categoryName: '', categoryId: '' },
    allPostsTotalCount,
    indexTemplate
  )

  // create pages for each category with pagination
  const categoryTemplate = `${__dirname}/src/templates/category/category.js`
  categories
    .filter(({ node }) => postResults.data[node.categoryId])
    .forEach(({ node }) => {
      const totalCount = postResults.data[node.categoryId].totalCount
      createCategoryPages(node, totalCount, categoryTemplate)
    })

  // create pages for each post
  const postTemplate = `${__dirname}/src/templates/blog-post.js`
  posts.forEach(({ node }) => {
    createPage({
      path: `${node.slug}/`,
      component: postTemplate,
      context: {
        slug: node.slug,
      },
    })
  })
}
