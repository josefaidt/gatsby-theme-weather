import React from 'react'
import styled from '@emotion/styled'
import { useWeather } from '../helpers/WeatherContext'

const CurrentTime = props => {
  const data = useWeather()
  if (data.pending) return <p>Loading...</p>
  if (data.error) return <p>Error</p>
  else {
    const currentDate = new Date(data.currently.time * 1000)
    const currentTime = currentDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    return <p>{currentTime}</p>
  }
}

export default CurrentTime
