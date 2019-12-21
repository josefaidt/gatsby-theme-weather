import React from 'react'
import styled from 'styled-components'

const StyledMain = styled.main`
  /*  */
  max-width: 90vw;
  @media screen and (min-width: 768px) {
    max-width: 50vw;
  }
`

const Main = props => {
  return <StyledMain>{props.children}</StyledMain>
}

export default Main
