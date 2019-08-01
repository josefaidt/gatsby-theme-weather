import React from 'react'
import styled from '@emotion/styled'
import { useWeather } from '../helpers/WeatherContext'
import { toLocalTime } from '../helpers/util'

const CurrentTime = props => {
  const data = useWeather()
  if (data.pending) return <p>Loading...</p>
  if (data.error) return <p>Error</p>
  else {
    const currentTime = toLocalTime(data.currently.time)
    return <p>{currentTime}</p>
  }
}

export default CurrentTime
