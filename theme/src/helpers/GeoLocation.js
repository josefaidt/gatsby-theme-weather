import React from 'react'
import useGeoLocation from '../hooks/useGeoLocation'

const GeoStateContext = React.createContext()
const GeoDispatchContext = React.createContext()

const GeoReducer = (state, action) => {
  console.log(`[GeoReducer]`, state, action)
  switch (action.type) {
    case 'update':
      return { ...action.payload }
    case 'default':
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const GeoContextProvider = ({ children }) => {
  const geoLocation = useGeoLocation()
  console.log(`[PROVIDER] GEO`, geoLocation)
  const [state, dispatch] = React.useReducer(GeoReducer, geoLocation)
  console.log(`[PROVIDER] STATE`, state)
  React.useEffect(() => {
    console.log(`[useEffect], PENDING STATUS:`, geoLocation.pending)
    if (
      !geoLocation.pending &&
      geoLocation.data.latitude !== state.data.latitude &&
      geoLocation.data.longitude !== state.data.longitude
    ) {
      console.log('[useEffect] RUNNING DISPATCH')
      return dispatch({ type: 'update', payload: geoLocation })
    }
    return () => console.log('[useEffect] RERENDERING')
  }, [geoLocation, state.data])
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
