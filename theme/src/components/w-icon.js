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
} from '@carbon/icons-react'

const getWIcon = iconType => {
  switch (iconType) {
    case 'rain':
      return <CloudRain32 />
    case 'clear-day':
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
    default:
      return <Sunny32 />
  }
}

export default getWIcon
