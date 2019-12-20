module.exports = ({ apiKey, refreshInterval = 20 }) => ({
  siteMetadata: {
    title: 'gatsby-theme-weather',
    apiKey: apiKey || process.env.API_KEY,
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
