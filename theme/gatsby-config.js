module.exports = ({ apiKey }) => ({
  siteMetadata: {
    title: 'gatsby-theme-weather',
    apiKey: apiKey || process.env.API_KEY,
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/Skeleton.js'),
        },
      },
    },
  ],
})
