import React from 'react'
import styled from '@emotion/styled'
import { useThemeUI } from 'theme-ui'
import Card from './Card'

const StyledCards = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  width: 100%;
`

const ColorCards = props => {
  const {
    theme: { colors },
  } = useThemeUI()
  console.log(colors)

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

export default ColorCards
