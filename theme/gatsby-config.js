module.exports = options => ({
  siteMetadata: {
    title: 'gatsby-theme-weather',
    refreshInterval: options.refreshInterval || 20,
  },
  plugins: ['gatsby-plugin-styled-components'],
})
