import React from 'react'

const WeatherStateContext = React.createContext()
const WeatherDispatchContext = React.createContext()

const WeatherReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload }
    case 'clear':
      return null
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const WeatherProvider = ({ children }) => {
  // TODO: useEffect to update context when localStorage is available
  // const cachedData = localStorage && JSON.parse(localStorage.getItem('weather'))
  const [state, dispatch] = React.useReducer(WeatherReducer, null)
  return (
    <WeatherStateContext.Provider value={state}>
      <WeatherDispatchContext.Provider value={dispatch}>{children}</WeatherDispatchContext.Provider>
    </WeatherStateContext.Provider>
  )
}

const useWeatherState = () => {
  const context = React.useContext(WeatherStateContext)
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider')
  }
  return context
}

const useWeatherDispatch = () => {
  const context = React.useContext(WeatherDispatchContext)
  if (context === undefined) {
    throw new Error('useWeatherDispatch must be used within a WeatherProvider')
  }
  return context
}

const useWeather = () => {
  const stateContext = React.useContext(WeatherStateContext)
  const dispatchContext = React.useContext(WeatherDispatchContext)
  if (dispatchContext === undefined && stateContext === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider')
  }
  return [stateContext, dispatchContext]
}

export { WeatherProvider, useWeather, useWeatherDispatch, useWeatherState }
