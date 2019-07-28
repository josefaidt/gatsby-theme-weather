import React from 'react'
import { useStaticQuery, graphql as gql } from 'gatsby'

const KeyStateContext = React.createContext()
const KeyDispatchContext = React.createContext()

const KeyReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return { ...action.payload }
    case 'default':
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const KeyProvider = ({ children }) => {
  const data = useStaticQuery(gql`
    query {
      site {
        siteMetadata {
          apiKey
        }
      }
    }
  `)
  const [state, dispatch] = React.useReducer(KeyReducer, data.site.siteMetadata.apiKey)
  return (
    <KeyStateContext.Provider value={state}>
      <KeyDispatchContext.Provider value={dispatch}>{children}</KeyDispatchContext.Provider>
    </KeyStateContext.Provider>
  )
}

const useKey = () => {
  const context = React.useContext(KeyStateContext)
  if (context === undefined) {
    throw new Error('useKey must be used within a KeyProvider')
  }
  return context
}

const useKeyDispatch = () => {
  const context = React.useContext(KeyDispatchContext)
  if (context === undefined) {
    throw new Error('useKeyDispatch must be used within a KeyProvider')
  }
  return context
}

export { KeyProvider, useKey, useKeyDispatch }
