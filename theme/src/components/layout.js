import React from 'react'
import { css, Global } from '@emotion/core'
import { Layout as StyledLayout, Header, Main, Container } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import useGeoLocation from '../hooks/useGeoLocation'

const Layout = ({ children, pageContext }) => {
  const { geoLocation, pending } = useGeoLocation()
  const GeoLocationContext = React.createContext()
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  console.log(geoLocation)

  return (
    <GeoLocationContext.Provider value={geoLocation}>
      <StyledLayout>
        <Global
          styles={css`
            body {
              margin: 0;
            }
          `}
        />
        <Header>
          <span>{data.site.siteMetadata.title}</span>
        </Header>
        <Main>
          <h1>{pageContext.frontmatter.title}</h1>
          <Container>{children}</Container>
          {!pending ? (
            <pre>{JSON.stringify(geoLocation, null, 2)}</pre>
          ) : (
            <span>Pending GeoLocation...</span>
          )}
        </Main>
      </StyledLayout>
    </GeoLocationContext.Provider>
  )
}

export default Layout
