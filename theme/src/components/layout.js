import React from 'react'
import styled from 'styled-components'

const StyledLayout = styled.div`
  background-color: pink;
  color: grey;
`

const Layout = props => <StyledLayout {...props} />

export default Layout
