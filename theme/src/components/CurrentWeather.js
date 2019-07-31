import React from 'react'
import styled from '@emotion/styled'
import { useThemeUI } from 'theme-ui'
import { useWeather } from '../helpers/WeatherContext'
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

const WCurrently = props => {
  const data = useWeather()
  const {
    theme: { colors },
  } = useThemeUI()
  if (data.pending || data.error) {
    return (
      <StyledWCurrently theme={colors}>
        <header>
          <h1>{data.pending ? 'Loading...' : data.error ? 'Error' : null}</h1>
          <div className="wcurrently-icon--container">
            <WIcon icon={data.pending ? 'loading' : data.error ? 'error' : 'loading'} />
          </div>
        </header>
      </StyledWCurrently>
    )
  } else {
    const currentDate = new Date(data.currently.time * 1000)
    const currentTime = currentDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    return (
      <StyledWCurrently theme={colors}>
        <header>
          <h1>{data.currently.summary}</h1>
          <div className="wcurrently-icon--container">
            <WIcon icon={data.currently.icon} />
          </div>
        </header>
        <span id="wcurrently-time">{currentTime}</span>
        <p>
          Currently it is {Math.round(data.currently.temperature)}
          &deg;F
        </p>
        <p>
          Feels like {Math.round(data.currently.apparentTemperature)}
          &deg;F
        </p>
      </StyledWCurrently>
    )
  }
}

export default WCurrently
