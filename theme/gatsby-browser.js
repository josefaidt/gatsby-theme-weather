import React from 'react'
import { ThemeProvider } from './src/helpers/ThemeContext'
import { GeoContextProvider } from './src/helpers/GeoContext'
import { WeatherProvider } from './src/helpers/WeatherContext'
import { NotificationProvider } from './src/helpers/NotificationContext'
import GlobalStyle from './src/style.css'
import theme from './src/theme'

// eslint-disable-next-line react/display-name
export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <GlobalStyle theme={theme} />
      <NotificationProvider>
        <GeoContextProvider>
          <WeatherProvider>{element}</WeatherProvider>
        </GeoContextProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}
