const d = require('dotenv')
if (process.env.NODE_ENV !== 'PRODUCTION') {
  d.config({
    path: `.env.development`,
  })
  console.log('LOADED SUCCESSFULLY')
}

console.log('NODE ENV FROM DEMO', process.env.NODE_ENV)
console.log('PROCESS ENV FROM DEMO', process.env.API_KEY)

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
