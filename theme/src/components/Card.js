import React from 'react'
import styled from 'styled-components'
import { useThemeUI } from 'theme-ui'

const StyledCard = styled.article`
  background-color: ${({ theme }) => `${theme.primary}d9` || 'whitesmoke'};
  color: ${({ theme }) => theme.accent || 'black'};

  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
  font-weight: bold;

  & > span.datetime {
    font-size: 0.9rem;
    position: relative;
    top: -1.5rem;
    display: block;
  }

  header {
    display: grid;
    grid-template-columns: 90% 10%;

    .icon--container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  svg {
    fill: ${({ theme }) => theme.accent || 'black'};
    transform: scale(1.5);
  }

  @media only screen and (max-width: 768px) {
    header {
      grid-template-columns: 1fr;
      grid-template-rows: 5rem auto;

      & > h1 {
        grid-row: 2;
      }
    }
  }
`

const Card = props => {
  const {
    theme: { colors },
  } = useThemeUI()
  return <StyledCard theme={colors} {...props} />
}

export { StyledCard }
export default Card
