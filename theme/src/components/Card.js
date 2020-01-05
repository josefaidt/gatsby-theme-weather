import React from 'react'
import styled, { ThemeContext } from 'styled-components'

const StyledCard = styled.article`
  background-color: ${({ theme }) => `${theme.colors.primary}d9` || 'whitesmoke'};
  color: ${({ theme }) => theme.colors.accent || 'black'};

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
    fill: ${({ theme }) => theme.colors.accent || 'black'};
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
  const theme = React.useContext(ThemeContext)
  return <StyledCard theme={theme} {...props} />
}

export { StyledCard }
export default Card
