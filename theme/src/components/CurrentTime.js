import React from 'react'
import { useWeather } from '../helpers/WeatherContext'
import { toLocalTime } from '../helpers/util'

const CurrentTime = props => {
  const data = useWeather()
  if (data.pending) return <p>Loading...</p>
  if (data.error) return <p>Error</p>
  else {
    const currentTime = toLocalTime(data.currently.time)
    return <p {...props}>{currentTime}</p>
  }
}

export default CurrentTime
