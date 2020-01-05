import React from 'react'
import useGeoLocation from '../hooks/useGeoLocation'
import { useNotificationDispatch } from './NotificationContext'

const GeoStateContext = React.createContext()
const GeoDispatchContext = React.createContext()

const GeoReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      // localStorage.setItem('location', JSON.stringify({ ...action.payload }))
      return { ...action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const GeoContextProvider = ({ children }) => {
  const { data, error } = useGeoLocation()
  const [state, dispatch] = React.useReducer(GeoReducer, { data, error, pending: true })
  const notificationDispatch = useNotificationDispatch()
  React.useEffect(() => {
    if (
      data.latitude !== state.data.latitude ||
      data.longitude !== state.data.longitude ||
      error !== state.error
    ) {
      if (error) {
        notificationDispatch({
          type: 'create',
          payload: {
            type: 'error',
            content: {
              title: 'Issue with GeoLocation',
              description:
                'There is an issue with retrieving the GeoLocation from your browser. Are you in incognito mode?',
            },
          },
        })
      } else {
        notificationDispatch({
          type: 'create',
          payload: {
            type: 'info',
            content: {
              title: 'GeoLocation Loaded',
              description: 'GeoLocation loaded successfully',
            },
          },
        })
      }
      return dispatch({ type: 'update', payload: { data, error, pending: false } })
    }
  }, [data, error, notificationDispatch, state])
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
