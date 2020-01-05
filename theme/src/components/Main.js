import React from 'react'
import styled from 'styled-components'
import { useCurrentTheme } from '../helpers/ThemeContext'

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  main {
    display: grid;
    grid-gap: 1.5rem;

    margin: 3rem 0;
    width: 90vw;
    color: ${({ theme }) => theme.colors.text || 'black'};
    @media screen and (min-width: 959px) {
      width: 50vw;
    }
  }
`

const Main = props => {
  const theme = useCurrentTheme()
  return (
    <StyledMainContainer theme={theme}>
      <main>{props.children}</main>
    </StyledMainContainer>
  )
}

export default Main
