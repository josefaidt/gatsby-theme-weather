import React from 'react'
import theme from '../theme'

const ThemeStateContext = React.createContext()
const ThemeDispatchContext = React.createContext()

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case 'toggle': {
      break
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(ThemeReducer, theme)
  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  )
}

const useCurrentTheme = () => {
  const context = React.useContext(ThemeStateContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return { colors: context.colors }
}

const useThemeDispatch = () => {
  const context = React.useContext(ThemeDispatchContext)
  if (context === undefined) {
    throw new Error('useThemeDispatch must be used within a ThemeProvider')
  }
  return context
}

const useTheme = () => {
  const stateContext = React.useContext(ThemeStateContext)
  const dispatchContext = React.useContext(ThemeDispatchContext)
  if (dispatchContext === undefined && stateContext === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return [stateContext, dispatchContext]
}

export { ThemeProvider, useTheme, useThemeDispatch, useCurrentTheme }
