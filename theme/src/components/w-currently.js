import React from 'react'
import styled from '@emotion/styled'
import { useThemeUI } from 'theme-ui'
import { useWeather } from '../helpers/WeatherContext'
import getWIcon from './w-icon'

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
      grid-template-rows: 5rem auto;

      & > h1 {
        grid-row: 2;
      }
    }
  }

  .skeleton {
    display: hidden;
  }
`

const WCurrently = props => {
  const data = useWeather()
  const {
    theme: { colors },
  } = useThemeUI()
  console.log('data from wcurrently', data)
  const icon = data.pending ? null : getWIcon(data.currently.icon)
  return (
    <StyledWCurrently theme={colors}>
      <header>
        <h1 className={data.pending ? 'skeleton' : ''}>{data.pending || data.currently.summary}</h1>
        <div className={data.pending ? 'skeleton' : 'wcurrently-icon--container'}>{icon}</div>
      </header>
      <p className={data.pending ? 'skeleton' : ''}>
        Currently it is {data.pending || Math.round(data.currently.temperature)}&deg;F
      </p>
      <p className={data.pending ? 'skeleton' : ''}>
        Feels like {data.pending || Math.round(data.currently.apparentTemperature)}&deg;F
      </p>
    </StyledWCurrently>
  )
}

export default WCurrently
