import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useCurrentTheme } from '../helpers/ThemeContext'

const StyledCard = styled(motion.article)`
  background-color: ${({ theme }) => theme.colors.background || 'white'};
  position: relative;
  overflow: hidden;
  /* border: 1px solid red; */

  box-shadow: 0 4px 8px 0 'rgba(0,0,0,0.2)';
  border: 1px solid ${({ theme }) => `${theme.colors.text}33` || 'rgba(0,0,0,0.2)'};
  border-radius: 5px;
  padding: 0.5rem 1rem;
  max-height: 50vh;
  overflow-y: auto;

  .gtw--card--header-title__container {
    margin-top: 0.5rem;
    margin-bottom: 0.4rem;

    h1,h2,h3,h4,h5 {
      margin: 0;
    }
    padding-bottom: 1.2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .gtw--card--header-icon__container {
    width: 2.2rem;
    svg {
      display: flex;
      fill: ${({ theme }) => theme.colors.text || 'black'};
    }
  }
  .gtw--card--body__container {
    p {
      padding: 0 1rem;
    }
  }

  button#gtw--card--button__close {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;

    width: 1.5rem;
    height: 1.3rem;
    border: none;
    border-bottom-left-radius: 0.125rem;

    svg {
      height: 0.5rem;
      width: 0.5rem;
      line {
        stroke: ${({ theme }) => theme.colors.text || 'black'};
      }
    }

    transition: all 0.3s ease;
    &:hover {
      transition: all 0.3s ease;
      background-color: ${({ theme }) => `${theme.colors.text}b3` || '#bbbbbbcc'};
      svg line {
        stroke: ${({ theme }) => theme.colors.background || 'white'};
      }
    }
  }
}
  /* background-color: ${({ theme }) => `${theme.colors.primary}d9` || 'whitesmoke'};
  color: ${({ theme }) => theme.colors.accent || 'black'}; */

  /* padding: 1rem;
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
  } */

  svg {
    fill: ${({ theme }) => theme.colors.accent || 'black'};
    transform: scale(1.5);
  }

  /* @media only screen and (max-width: 768px) {
    header {
      grid-template-columns: 1fr;
      grid-template-rows: 5rem auto;

      & > h1 {
        grid-row: 2;
      }
    }
  } */
`

const Card = props => {
  const theme = useCurrentTheme()
  return (
    <StyledCard
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      theme={theme}
      className={theme.colors._current === 'dark' ? 'gtw--theme__dark' : 'gtw--theme__light'}
      {...props}
    />
  )
}

export { StyledCard }
export default Card
