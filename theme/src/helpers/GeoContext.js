import React from 'react'
import useGeoLocation from '../hooks/useGeoLocation'

const GeoStateContext = React.createContext()
const GeoDispatchContext = React.createContext()

const GeoReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      localStorage.setItem('location', JSON.stringify({ ...action.payload }))
      return { ...action.payload }
    case 'default':
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const GeoContextProvider = ({ children }) => {
  const { data, error } = useGeoLocation()
  const [state, dispatch] = React.useReducer(GeoReducer, { data, error, pending: true })
  // console.log(`[PROVIDER] STATE`, state)
  React.useEffect(() => {
    if (
      data.latitude !== state.data.latitude ||
      data.longitude !== state.data.longitude ||
      error !== state.error
    ) {
      if (data.latitude === null && data.longitude === null) {
        if (!localStorage) {
          console.warn('GEO STATE IS NULL, LOCALSTORAGE is unavailable, skipping...')
        } else {
          console.warn('GEO STATE IS NULL, READING FROM CACHE')
          const cachedGeo = JSON.parse(localStorage.getItem('location'))
          return dispatch({ type: 'update', payload: { data: cachedGeo, error, pending: false } })
        }
      } else {
        return dispatch({ type: 'update', payload: { data, error, pending: false } })
      }
    }
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

const useGeo = () => {
  const stateContext = React.useContext(GeoStateContext)
  const dispatchContext = React.useContext(GeoDispatchContext)
  if (dispatchContext === undefined && stateContext === undefined) {
    throw new Error('useGeo must be used within a GeoProvider')
  }
  return [stateContext, dispatchContext]
}

export { GeoContextProvider, useGeoState, useGeoDispatch, useGeo }
