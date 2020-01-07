import React from 'react'
import styled from 'styled-components'
import { useWeather } from '../../helpers/WeatherContext'
import { toLocalTime } from '../../helpers/util'
import Card from '../Card'
import WIcon from './w-icon'

const StyledCard = styled(Card)`
  .gtw--card--body-short-description {
    font-style: italic;
  }
`

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
  data &&
    data.forecast &&
    process.env.NODE_ENV !== 'production' &&
    console.log('CURRENTWEATHER DATA', data.forecast)
  console.log('WEATHER DATA', data)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDay = days[new Date().getDay()]
  const getCurrentName = name => {
    const id = name
      .split(' ')
      .slice(-1)
      .toString()
    let result = id
    // TODO: add more cases
    if (id.toLowerCase() === 'tonight') {
      result = 'Night'
    }
    return result
  }
  return (
    <StyledCard>
      <div className="gtw--card--header-title__container">
        <h1>
          {currentDay} {current && getCurrentName(current.name)}
        </h1>
        <div className="gtw--card--header-icon__container">
          <WIcon icon={current ? current.shortForecast.toLowerCase() : 'loading'} />
        </div>
      </div>
      <div className="gtw--card--body__container">
        {data && data.county && current ? (
          <>
            <p className="gtw--card--body-short-description">{current.shortForecast}</p>
            <p>
              Currently in {data.county.properties.name} it is {Math.round(current.temperature)}
              &deg;{current.temperatureUnit}
            </p>
            <p className="gtw--card--body-description">{current.detailedForecast}</p>
          </>
        ) : null}
        {/* {data && data.forecast ? <pre>{JSON.stringify(data.forecast, null, 2)}</pre> : null} */}
      </div>
    </StyledCard>
  )
}

export default CurrentWeather
