import React from 'react'
import Layout from 'gatsby-theme-weather/src/layouts/default'
import { useWeatherState } from 'gatsby-theme-weather/src/helpers/WeatherContext'

const HomePage = props => {
  const weatherState = useWeatherState()
  return (
    <Layout>
      <pre>{JSON.stringify(weatherState, null, 2)}</pre>
    </Layout>
  )
}

export default HomePage
