module.exports = {
  siteMetadata: {
    title: 'Gatsby Theme Jam Example Submission',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: {
          views: require.resolve('./src/templates/default.js'),
          default: require.resolve('./src/templates/default.js'),
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `views`,
        path: `views`,
      },
    },
  ],
}
