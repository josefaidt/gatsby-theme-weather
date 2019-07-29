import React from 'react'
import styled from '@emotion/styled'
import { useThemeUI } from 'theme-ui'
import { useWeather } from '../helpers/WeatherContext'

const StyledWCurrently = styled.div`
  background-color: ${({ theme }) => theme.primary || 'whitesmoke'};
  color: ${({ theme }) => theme.foam || 'black'};

  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
`

const WCurrently = props => {
  const data = useWeather()
  const {
    theme: { colors },
  } = useThemeUI()
  console.log('data from wcurrently', data)
  console.log('PROPS from wcurrently', props)
  console.log('PENDING? wcurrently', data.pending)
  if (data.pending) return <h1>Loading...</h1>
  else {
    const {
      currently,
      hourly: { summary },
    } = data
    return (
      <StyledWCurrently theme={colors}>
        <h1>Currently</h1>
        <h4>{summary}</h4>
        <p>{Math.round(currently.temperature)}&deg;</p>
        <p>Feels like {Math.round(currently.apparentTemperature)}&deg;</p>
      </StyledWCurrently>
    )
  }
}

export default WCurrently
