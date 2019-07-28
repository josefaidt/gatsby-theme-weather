module.exports = ({ apiKey = null }) => ({
  siteMetadata: {
    title: 'gatsby-theme-weather',
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
