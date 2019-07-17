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
  const { data, error } = useGeoLocation()
  console.log(`[PROVIDER] GEO`, { data, error })
  const [state, dispatch] = React.useReducer(GeoReducer, { data, error })
  // console.log(`[PROVIDER] STATE`, state)
  React.useEffect(() => {
    console.log(`[useEffect] GEO DATA VS STATE`, { data, error }, state)

    if (
      data.latitude !== state.data.latitude ||
      data.longitude !== state.data.longitude ||
      error !== state.error
    ) {
      console.log('[useEffect] RUNNING DISPATCH')
      return dispatch({ type: 'update', payload: { data, error } })
    }

    return () => console.log('[useEffect] RERENDERING')
  }, [data, error, state])
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
