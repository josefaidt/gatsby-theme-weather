import React from 'react'
import { Renew32 } from '@carbon/icons-react'
import { useStaticQuery, graphql } from 'gatsby'
import styled, { ThemeContext } from 'styled-components'
import RefreshButton from './RefreshButton.css'

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.primary || 'white'};
  color: ${({ theme }) => theme.colors.background || 'black'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  span {
    margin: 0;
  }

  .gtw--header-button__toggle {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 1fr;
    grid-gap: 0.5rem;
  }
`

const Header = ({ children, title }) => {
  const theme = React.useContext(ThemeContext)
  const queryData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <StyledHeader theme={theme}>
      <h1>{title || queryData.site.siteMetadata.title}</h1>
      {children}
      {/* {fetchError || geoError ? (
          <p style={{ margin: 0 }}>Error: {fetchError || geoError}</p>
        ) : null} */}
      <div className="gtw--header-button__toggle">
        <RefreshButton
          // className={(geoPending || weatherState === null) && !fetchError ? 'animate' : ''}
          // onClick={refreshData}
          onClick={() => {}}
        >
          <Renew32 />
        </RefreshButton>
      </div>
    </StyledHeader>
  )
}

export default Header
