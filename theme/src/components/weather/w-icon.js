import React from 'react'
import {
  CloudRain32,
  Fog32,
  Cloud32,
  CloudSnow32,
  CloudLightning32,
  Sunny32,
  LightFilled32,
  Sunset32,
  Humidity32,
  Hurricane32,
  PartlyCloudy32,
  Temperature32, // for F to C toggle?
  FaceDissatisfied32,
  FaceDizzy32,
} from '@carbon/icons-react'
import styled from 'styled-components'
import { useCurrentTheme } from '../../helpers/ThemeContext'

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &:after {
    content: ' ';
    display: block;
    width: 32px;
    height: 32px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid ${({ theme }) => theme.colors.text || 'black'};
    border-color: ${({ theme }) => theme.colors.text || 'black'} transparent
      ${({ theme }) => theme.colors.text || 'black'} transparent;
    animation: spin-two-ring 1.2s linear infinite;
  }
  @keyframes spin-two-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const WIcon = ({ icon }) => {
  const theme = useCurrentTheme()
  switch (icon) {
    case 'rain':
      return <CloudRain32 />
    case 'clear-day':
    case 'sunny':
      return <Sunny32 />
    case 'clear-night':
      return <LightFilled32 />
    case 'snow':
      return <CloudSnow32 />
    case 'sleet':
      return <CloudSnow32 />
    case 'wind':
      return <Sunny32 /> // needs updating
    case 'fog':
      return <Fog32 />
    case 'cloudy':
      return <Cloud32 />
    case 'partly-cloudy-day':
      return <PartlyCloudy32 />
    case 'partly-cloudy-night':
      return <PartlyCloudy32 />
    case 'thunderstorm':
      return <CloudLightning32 />
    case 'error':
      return <FaceDizzy32 />
    case 'loading':
      return <Loading theme={theme} />
    default:
      return <span>...</span>
  }
}

export default WIcon
