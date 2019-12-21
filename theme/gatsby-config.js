module.exports = ({ refreshInterval = 20 }) => ({
  siteMetadata: {
    title: 'gatsby-theme-weather',
    refreshInterval, // in minutes
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `src/pages`,
      },
    },
  ],
})
