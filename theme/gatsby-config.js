module.exports = ({ apiKey = null }) => ({
  siteMetadata: {
    title: 'gatsby-theme-weather',
    apiKey: process.env.API_KEY || apiKey,
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
