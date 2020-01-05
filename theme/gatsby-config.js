const path = require('path')
module.exports = options => {
  const { refreshInterval = 20, offline = false } = options
  return {
    siteMetadata: {
      title: 'gatsby-theme-weather',
      refreshInterval: refreshInterval,
    },
    plugins: [
      'gatsby-plugin-styled-components',
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `gatsby-theme-weather`,
          icon: path.join(__dirname, 'img/favicon.png'),
          short_name: `weather`,
          start_url: `/`,
          background_color: `#FDF8F7`,
          theme_color: `#c6797e`,
          display: `standalone`,
        },
      },
      offline && {
        resolve: `gatsby-plugin-offline`,
        options: {
          cacheId: `gatsby-plugin-offline`,
          // Don't cache-bust JS or CSS files, and anything in the static directory,
          // since these files have unique URLs and their contents will never change
          dontCacheBustUrlsMatching: /(\.css.js$|static\/)/,
          runtimeCaching: [
            {
              // Use cacheFirst since these don't need to be revalidated (same RegExp
              // and same reason as above)
              urlPattern: /(\.css.js$|static\/)/,
              handler: `cacheFirst`,
            },
            {
              urlPattern: /(\.js$)/,
              handler: `staleWhileRevalidate`,
            },
            {
              // Add runtime caching of various other page resources
              urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: `staleWhileRevalidate`,
            },
            {
              // Google Fonts CSS (doesn't end in .css so we need to specify it)
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: `staleWhileRevalidate`,
            },
          ],
          skipWaiting: true,
          clientsClaim: true,
        },
      },
    ].filter(Boolean),
  }
}
