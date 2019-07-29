import React from 'react'
import styled from '@emotion/styled'
import { useThemeUI } from 'theme-ui'

const StyledCard = styled.div`
  /* background-color: ${({ theme }) => theme.colors.text || 'black'}; */
  background-color: ${({ color, theme }) => color || (theme.colors.text || 'black')};
  width: 100%;
  height: 200px;
`

const Card = props => {
  return <StyledCard color={props.color} {...props}></StyledCard>
}

const StyledCards = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  width: 100%;

  @media only screen and (max-width: 768px) {
    & {
      grid-template-columns: repeat(2, auto);
      grid-template-rows: auto;
    }
  }
`

const ColorSwatch = props => {
  const {
    theme: { colors },
  } = useThemeUI()

  return (
    <StyledCards>
      <Card color={colors.text} />
      <Card color={colors.grey} />
      <Card color={colors.primary} />
      <Card color={colors.peach} />
      <Card color={colors.foam} />
    </StyledCards>
  )
}

export default ColorSwatch
