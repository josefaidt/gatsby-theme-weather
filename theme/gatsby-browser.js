import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GeoContextProvider } from './src/helpers/GeoContext'
import { WeatherProvider } from './src/helpers/WeatherContext'
import GlobalStyle from './src/style.css'
import theme from './src/theme'

// eslint-disable-next-line react/display-name
export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GeoContextProvider>
        <WeatherProvider>{element}</WeatherProvider>
      </GeoContextProvider>
    </ThemeProvider>
  )
}
