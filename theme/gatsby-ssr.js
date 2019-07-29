import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { GeoContextProvider } from './src/helpers/GeoContext'
import { WeatherProvider } from './src/helpers/WeatherContext'
import theme from './src/gatsby-plugin-theme-ui/index'

// eslint-disable-next-line react/display-name
export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <GeoContextProvider>
        <WeatherProvider>{element}</WeatherProvider>
      </GeoContextProvider>
    </ThemeProvider>
  )
}
