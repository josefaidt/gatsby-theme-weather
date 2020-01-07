import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const StyledNavButton = styled(motion.button)`
  margin: 0;
  display: flex;
  align-items: center;
  border: none;
  background-color: #00000000;
  fill: ${({ theme }) => theme.accent || 'white'};
  outline: ${({ theme }) => theme.accent || 'white'};

  &.animate--spin {
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  &:hover {
    cursor: pointer;
    z-index: 5;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }
`

const NavButton = props => (
  <StyledNavButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} {...props}>
    {props.children}
  </StyledNavButton>
)

export default NavButton
