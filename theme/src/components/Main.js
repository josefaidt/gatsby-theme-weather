import React from 'react'
import styled, { ThemeContext } from 'styled-components'

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  main {
    margin: 3rem 0;
    max-width: 90vw;
    color: ${({ theme }) => theme.colors.text || 'black'};
    @media screen and (min-width: 959px) {
      max-width: 50vw;
    }
  }
`

const Main = props => {
  const theme = React.useContext(ThemeContext)
  return (
    <StyledMainContainer theme={theme}>
      <main>{props.children}</main>
    </StyledMainContainer>
  )
}

export default Main
