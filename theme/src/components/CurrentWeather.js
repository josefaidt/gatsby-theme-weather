import React from 'react'
import { useWeather } from '../helpers/WeatherContext'
import { toLocalTime } from '../helpers/util'
import WIcon from './w-icon'
import Card from './Card'

const CurrentWeather = props => {
  const data = useWeather()
  const { pending, error } = data
  console.log('CURRENTWEATHER DATA', data)
  const currentTime = data.pending || data.error ? null : toLocalTime(data.currently.time)
  return (
    <Card>
      <header>
        <h1>
          {data.pending
            ? 'Loading...'
            : data.error
            ? 'Error'
            : `${data.pending || data.error ? '--' : data.currently.summary}`}
        </h1>
        <div className="icon--container">
          <WIcon icon={data.pending ? 'loading' : data.error ? 'error' : data.currently.icon} />
        </div>
      </header>
      <span className="datetime">{data.pending || data.error ? '--' : `${currentTime}`}</span>
      <p>
        Currently it is {data.pending || data.error ? '--' : Math.round(data.currently.temperature)}
        &deg;F
      </p>
      <p>
        Feels like{' '}
        {data.pending || data.error ? '--' : Math.round(data.currently.apparentTemperature)}
        &deg;F
      </p>
    </Card>
  )
}

export default CurrentWeather
