import React from 'react'
import { useWeather } from '../../helpers/WeatherContext'
import { toLocalDate } from '../../helpers/util'
import Card from '../Card'
import WIcon from './w-icon'

const TodaysWeather = ({ children }) => {
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
      {children}
    </Card>
  )
}

export default TodaysWeather
