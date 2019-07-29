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
  ],
}
