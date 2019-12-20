import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    width: 100%;
  }
  body {
    color: ${props => (props.colors.background ? 'white' : 'black')};
    font-family: ${props => props.theme.fontFamily};
  }
`

export default GlobalStyle
