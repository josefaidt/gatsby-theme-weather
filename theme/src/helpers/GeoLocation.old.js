import React from 'react'
import useGeoLocation from '../hooks/useGeoLocation'

const GeoStateContext = React.createContext()
const GeoDispatchContext = React.createContext()

const geoReducer = (state, action) => {
  switch (action.type) {
    case 'update': {
      return {
        geoLocation: {
          ...state.geoLocation,
          ...state.updateGeo,
        },
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function GeoProvider({ children }) {
  const { geoLocation, pending, error } = useGeoLocation()
  const [state, dispatch] = React.useReducer(geoReducer, { geoLocation, pending, error })
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

// const GeoLocation = ({ children }) => {
//   const { geoLocation, pending } = useGeoLocation()
//   return (
//     <GeoLocationContext.Provider value={{ geoLocation, pending }}>
//       {children}
//     </GeoLocationContext.Provider>
//   )
// }

// function useCountState() {
//   const context = React.useContext(CountStateContext)
//   if (context === undefined) {
//     throw new Error('useCountState must be used within a CountProvider')
//   }
//   return context
// }
// function useCountDispatch() {
//   const context = React.useContext(CountDispatchContext)
//   if (context === undefined) {
//     throw new Error('useCountDispatch must be used within a CountProvider')
//   }
//   return context
// }

export { GeoProvider, useGeoState, useGeoDispatch }
