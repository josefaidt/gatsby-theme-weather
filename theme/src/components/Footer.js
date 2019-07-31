import React from 'react'
import styled from '@emotion/styled'

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  display: flex;
  justify-content: space-around;
`

const Footer = props => <StyledFooter {...props} />

export default Footer
