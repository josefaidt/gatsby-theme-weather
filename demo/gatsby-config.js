const d = require('dotenv')
if (process.env.NODE_ENV !== 'PRODUCTION') {
  d.config({
    path: `.env`,
  })
  console.log('LOADED SUCCESSFULLY')
}

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-weather',
      options: {
        api_key: process.env.API_KEY,
      },
    },
  ],
}
