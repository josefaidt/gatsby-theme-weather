import React from 'react'
import styled from '@emotion/styled'

const StyledCard = styled.div`
  /* background-color: ${({ theme }) => theme.colors.text || 'black'}; */
  background-color: ${({ color, theme }) => color || (theme.colors.text || 'black')};
  width: 200px;
  height: 200px;
`

const Card = props => {
  return <StyledCard color={props.color} {...props}></StyledCard>
}

export default Card
