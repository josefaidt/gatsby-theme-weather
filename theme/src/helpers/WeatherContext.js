import React from 'react'
import { useStaticQuery, graphql as gql } from 'gatsby'

const WeatherStateContext = React.createContext()
const WeatherDispatchContext = React.createContext()

const isEmpty = obj => {
  if (Object.keys(obj).length !== 0) {
    return true
  } else {
    return false
  }
}

const WeatherReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      if (isEmpty(action.payload)) {
        return { pending: true }
      } else {
        return { ...action.payload }
      }
    case 'default':
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const WeatherProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(WeatherReducer, { pending: true })
  return (
    <WeatherStateContext.Provider value={state}>
      <WeatherDispatchContext.Provider value={dispatch}>{children}</WeatherDispatchContext.Provider>
    </WeatherStateContext.Provider>
  )
}

const useWeather = () => {
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

export { WeatherProvider, useWeather, useWeatherDispatch }
