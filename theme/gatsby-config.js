module.exports = {
  siteMetadata: {
    title: 'Gatsby Theme Jam Example Submission',
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          pages: require.resolve('./src/templates/default.js'),
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `src/pages`,
      },
    },
  ],
}
