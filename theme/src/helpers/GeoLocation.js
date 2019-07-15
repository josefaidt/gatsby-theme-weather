import React from 'react'
import useGeoLocation from '../hooks/useGeoLocation'

const GeoStateContext = React.createContext()
const GeoDispatchContext = React.createContext()

const GeoReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return { ...state }
    case 'reset':
      return Object.keys(state).map(s => (state[s] = null))
    case 'default':
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const GeoContextProvider = ({ children }) => {
  const { data: geoLocation, pending, error } = useGeoLocation()
  console.log(`[PROVIDER] GEO`, geoLocation, pending, error)
  const [state, dispatch] = React.useReducer(GeoReducer, { geoLocation, pending, error })
  console.log(`[PROVIDER] STATE`, state)
  return (
    <GeoStateContext.Provider value={state}>
      <GeoDispatchContext.Provider value={dispatch}>{children}</GeoDispatchContext.Provider>
    </GeoStateContext.Provider>
  )
}

const useGeoState = () => {
  const context = React.useContext(GeoStateContext)
  if (context === undefined) {
    throw new Error('useGeoState must be used within a GeoProvider')
  }
  return context
}

const useGeoDispatch = () => {
  const context = React.useContext(GeoDispatchContext)
  if (context === undefined) {
    throw new Error('useGeoDispatch must be used within a GeoProvider')
  }
  return context
}

export { GeoContextProvider, useGeoState, useGeoDispatch }
