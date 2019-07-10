exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type WeatherView implements Node {
      slug: String
    }
  `
  createTypes(typeDefs)
}

// exports.createPages = async ({ actions, reporter, graphql }) => {
//   reporter.warn('make sure to load data from somewhere!')

//   const { data } = await graphql(`
//     query {
//       allFile(filter: { sourceInstanceName: { eq: "views" } }) {
//         edges {
//           node {
//             id
//             dir
//             name
//             relativeDirectory
//           }
//         }
//       }
//     }
//   `)
//   data.allFile.edges.forEach(({ node }) => {
//     console.log(node)
//     const slug = node.name === '' ? '/' : `/${node.name}`
//     actions.createPage({
//       path: slug,
//       component: require.resolve(`./src/layouts/default.js`),
//       context: { slug: slug },
//     })
//   })

// // TODO replace this with data from somewhere
// actions.createPage({
//   path: '/',
//   component: require.resolve('./src/layouts/default.js'),
//   context: {
//     heading: 'weather',
//     // content: `
//     //   <p>
//     //     Use this handy theme example as the basis for your own amazing theme!
//     //   </p>
//     //   <p>
//     //     For more information, see
//     //     <a href="https://themejam.gatsbyjs.org">themejam.gatsbyjs.org</a>.
//     //   </p>
//     // `,
//   },
// })
// }
