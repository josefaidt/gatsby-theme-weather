import React from 'react'
import styled from '@emotion/styled'

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.colors.text || 'black'};
  width: 200px;
  height: 200px;
`

const Card = props => {
  console.log(props.theme)
  return <StyledCard {...props}></StyledCard>
}

export default Card
