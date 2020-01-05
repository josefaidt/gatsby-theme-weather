import React from 'react'
import { ThemeProvider, useCurrentTheme } from './src/helpers/ThemeContext'
import { GeoContextProvider } from './src/helpers/GeoContext'
import { WeatherProvider } from './src/helpers/WeatherContext'
import { NotificationProvider } from './src/helpers/NotificationContext'

export const onServiceWorkerUpdateReady = () => {
  // eslint-disable-next-line no-alert
  const answer = window.confirm(
    `This application has been updated. Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}

// eslint-disable-next-line react/display-name
export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <GeoContextProvider>
          <WeatherProvider>{element}</WeatherProvider>
        </GeoContextProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export const wrapPageElement = ({ element }) => {
  return <>{element}</>
}
