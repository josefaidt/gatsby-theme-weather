import React from 'react'
import { css, Global } from '@emotion/core'
import { Layout as StyledLayout, Header, Main, Container } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { useGeoState, useGeoDispatch } from '../helpers/GeoLocation'

const Layout = ({ children, pageContext }) => {
  const geoLocation = useGeoState()
  useGeoDispatch({ type: 'reset' })
  console.log(`[LAYOUT] GEO STATE`, geoLocation)
  const { pending } = geoLocation
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
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
        <Container>
          {children}
          <br />
          {!pending ? (
            <pre>{JSON.stringify(geoLocation, null, 2)}</pre>
          ) : pending && !geoLocation.error ? (
            <span>Pending GeoLocation...</span>
          ) : (
            <span>Need GeoLocation...</span>
          )}
        </Container>
      </Main>
    </StyledLayout>
  )
}

export default Layout
