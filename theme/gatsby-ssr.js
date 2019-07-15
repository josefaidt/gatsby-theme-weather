import React from 'react'
import { GeoContextProvider } from './src/helpers/GeoLocation'

// eslint-disable-next-line react/display-name
export const wrapRootElement = ({ element }) => {
  return <GeoContextProvider>{element}</GeoContextProvider>
}
