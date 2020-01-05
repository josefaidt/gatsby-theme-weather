import React from 'react'
import { useWeather } from '../../helpers/WeatherContext'
import { toLocalTime } from '../../helpers/util'
import Card from '../Card'
import WIcon from './w-icon'

const CurrentWeather = props => {
  const [current, setCurrent] = React.useState(null)
  const [data, dispatch] = useWeather()
  React.useEffect(() => {
    const getForecast = async forecastUrl => {
      const res = await fetch(forecastUrl)
      const data = await res.json()
      setCurrent(data.properties.periods[0])
      return dispatch({ type: 'update', payload: { forecast: { ...data } } })
    }
    if (data && !data.forecast) {
      getForecast(data.properties.forecast)
    }
  }, [data, dispatch])
  data && data.forecast && console.log('CURRENTWEATHER DATA', data.forecast)
  // const currentTime = data.pending || data.error ? null : toLocalTime(data.currently.time)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDay = days[new Date().getDay()]
  return (
    <Card>
      <div className="gtw--card--header-title__container">
        <h1>
          {currentDay} {current && current.name.split(' ').slice(-1)}
        </h1>
        <div className="gtw--card--header-icon__container">
          <WIcon icon={current ? current.shortForecast.toLowerCase() : 'loading'} />
        </div>
      </div>
      <div className="gtw--card--body__container">
        {data && data.forecast ? <pre>{JSON.stringify(data.forecast, null, 2)}</pre> : null}
      </div>
      {/* <span className="datetime">{data.pending || data.error ? '--' : `${currentTime}`}</span> */}
      {/* <p>
        Currently it is {data.pending || data.error ? '--' : Math.round(data.currently.temperature)}
        &deg;F
      </p>
      <p>
        Feels like{' '}
        {data.pending || data.error ? '--' : Math.round(data.currently.apparentTemperature)}
        &deg;F
      </p> */}
    </Card>
  )
}

export default CurrentWeather
