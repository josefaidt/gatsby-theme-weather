const d = require('dotenv')
if (process.env.NODE_ENV !== 'PRODUCTION') {
  d.config({
    path: `.env.development`,
  })
}

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-weather',
      options: {
        apiKey: process.env.API_KEY,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-theme-weather`,
        short_name: `weather`,
        start_url: `/`,
        background_color: `#FDF8F7`,
        theme_color: `#c6797e`,
        display: `standalone`,
      },
    },
  ],
}
