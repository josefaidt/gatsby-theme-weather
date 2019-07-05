module.exports = {
  siteMetadata: {
    title: 'Gatsby Theme Jam Example Submission',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `views`,
        path: `views`,
      },
    },
  ],
}
