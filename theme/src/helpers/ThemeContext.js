import React from 'react'
import theme from '../theme'
import useLocalStorage from '../hooks/useLocalStorage'

const ThemeStateContext = React.createContext()
const ThemeDispatchContext = React.createContext()

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case 'toggle': {
      const current = state.colors._current
      const newMode = Object.keys(state.modes)
        .filter(m => m !== current)
        .toString()
      return { ...state, colors: { _current: newMode, ...state.modes[newMode] } }
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(ThemeReducer, theme)
  const [mounted, setMounted] = React.useState(false)
  const [currentTheme, setCurrentTheme] = React.useState(theme.colors._current)
  const [cachedTheme, setCachedTheme] = useLocalStorage('gtw--theme-choice', theme.colors._current)
  React.useEffect(() => {
    setMounted(true)
    if (cachedTheme !== currentTheme && !mounted) {
      dispatch({ type: 'toggle' })
    }
    if (state.colors._current !== currentTheme) {
      setCurrentTheme(state.colors._current)
      if (cachedTheme !== state.colors._current) {
        setCachedTheme(state.colors._current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.colors._current])
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
