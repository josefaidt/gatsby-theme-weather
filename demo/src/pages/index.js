import React from 'react'
import Layout from 'gatsby-theme-weather/src/layouts/default'
import { CurrentWeather } from 'gatsby-theme-weather/src/components/weather'
import { useWeatherState } from 'gatsby-theme-weather/src/helpers/WeatherContext'

const HomePage = props => {
  const weatherState = useWeatherState()
  return (
    <Layout>
      <CurrentWeather />
      <pre style={{ maxHeight: '50rem' }}>{JSON.stringify(weatherState, null, 2)}</pre>
    </Layout>
  )
}

export default HomePage
