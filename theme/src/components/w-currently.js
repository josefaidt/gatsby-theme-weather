import React from 'react'
import styled from '@emotion/styled'
import { useWeather } from '../helpers/WeatherContext'

const StyledWCurrently = styled.div`
  background-color: ${({ theme }) => theme.primary || 'whitesmoke'};
`

const WCurrently = props => {
  const data = useWeather()
  console.log('data from wcurrently', data)
  return (
    <StyledWCurrently>
      <h1>Hello from WCurrently</h1>
      {/* <h2>{data.summary}</h2> */}
      {/* <p>{data.time}</p> */}
    </StyledWCurrently>
  )
}

export default WCurrently
