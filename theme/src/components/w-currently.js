import React from 'react'
import styled from '@emotion/styled'
import { useThemeUI } from 'theme-ui'
import { useWeather } from '../helpers/WeatherContext'

const StyledWCurrently = styled.div`
  background-color: ${({ theme }) => theme.primary || 'whitesmoke'};
  color: ${({ theme }) => theme.foam || 'black'};
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
  return (
    <StyledWCurrently theme={colors}>
      <h1>Hello from WCurrently</h1>
      {/* <h2>{data.summary}</h2> */}
      {/* <p>{data.time}</p> */}
    </StyledWCurrently>
  )
}

export default WCurrently
