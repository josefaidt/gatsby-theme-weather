import React from 'react'
import styled from '@emotion/styled'
import { useWeather } from '../helpers/WeatherContext'
import { toLocalDate } from '../helpers/util'
import WIcon from './w-icon'
import Card from './Card'

const TodaysWeather = props => {
  const data = useWeather()
  console.log('TODAYS WEATHER DATA', data)
  const currentDay = data.pending || data.error ? null : toLocalDate(data.currently.time)
  return (
    <Card>
      <header>
        <h1>{data.pending ? 'Loading...' : data.error ? 'Error' : data.hourly.summary}</h1>
        <div className="icon--container">
          <WIcon icon={data.pending ? 'loading' : data.error ? 'error' : data.hourly.icon} />
        </div>
      </header>
      <span className="datetime">{data.pending || data.error ? '--' : currentDay}</span>
    </Card>
  )
}

export default TodaysWeather
