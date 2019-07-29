import React from 'react'
import styled from '@emotion/styled'
import { useThemeUI } from 'theme-ui'
import {
  CloudRain32,
  Fog32,
  Cloud32,
  CloudSnow32,
  CloudLightning32,
  Sunny32,
  Sunset32,
} from '@carbon/icons-react'
import { useWeather } from '../helpers/WeatherContext'

const StyledWCurrently = styled.article`
  background-color: ${({ theme }) => `${theme.primary}d9` || 'whitesmoke'};
  color: ${({ theme }) => theme.foam || 'black'};

  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;

  header {
    display: grid;
    grid-template-columns: 90% 10%;

    .wcurrently-icon--container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  svg {
    fill: ${({ theme }) => theme.foam || 'black'};
    transform: scale(1.5);
  }

  @media only screen and (max-width: 768px) {
    header {
      grid-template-columns: 1fr;
      grid-template-rows: 5rem 10rem;

      & > h1 {
        grid-row: 2;
      }
    }
  }
`

const WIcon = iconType => {
  switch (iconType) {
    case 'rain':
      return <CloudRain32 />
    default:
      return <Sunny32 />
  }
}

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
    const icon = WIcon(currently.icon)
    return (
      <StyledWCurrently theme={colors}>
        <header>
          <h1>{summary}</h1>
          <div className="wcurrently-icon--container">{icon}</div>
        </header>
        <p>{Math.round(currently.temperature)}&deg;</p>
        <p>Feels like {Math.round(currently.apparentTemperature)}&deg;</p>
      </StyledWCurrently>
    )
  }
}

export default WCurrently
