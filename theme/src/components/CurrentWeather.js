import React from 'react'
import styled from '@emotion/styled'
import { useThemeUI } from 'theme-ui'
import { useWeather } from '../helpers/WeatherContext'
import { toLocalTime } from '../helpers/util'
import WIcon from './w-icon'

const StyledWCurrently = styled.article`
  background-color: ${({ theme }) => `${theme.primary}d9` || 'whitesmoke'};
  color: ${({ theme }) => theme.foam || 'black'};

  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;

  font-weight: bold;

  & > span#wcurrently-time {
    font-size: 0.9rem;
    position: relative;
    top: -1.5rem;
    display: block;
  }

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

const CurrentWeather = props => {
  const data = useWeather()
  const {
    theme: { colors },
  } = useThemeUI()
  console.log('CURRENTWEATHER DATA', data)
  const currentTime = data.pending || data.error ? null : toLocalTime(data.currently.time)
  return (
    <StyledWCurrently theme={colors}>
      <header>
        <h1>{data.pending ? 'Loading...' : data.error ? 'Error' : data.currently.summary}</h1>
        <div className="wcurrently-icon--container">
          <WIcon icon={data.pending ? 'loading' : data.error ? 'error' : data.currently.icon} />
        </div>
      </header>
      <span id="wcurrently-time">{data.pending || data.error ? '--' : currentTime}</span>
      <p>
        Currently it is {data.pending || data.error ? '--' : Math.round(data.currently.temperature)}
        &deg;F
      </p>
      <p>
        Feels like{' '}
        {data.pending || data.error ? '--' : Math.round(data.currently.apparentTemperature)}
        &deg;F
      </p>
    </StyledWCurrently>
  )
  // }
}

export default CurrentWeather
