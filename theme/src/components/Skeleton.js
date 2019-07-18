import React from 'react'
import { css, Global } from '@emotion/core'
import { Layout, Header, Main, Container } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { useGeoState } from '../helpers/GeoLocation'
import useWeather from '../hooks/useWeather'
import ColorCards from './ColorCards'

const Skeleton = ({ children, pageContext }) => {
  const geoLocation = useGeoState()
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
    <Layout>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />
      <Header>
        <span>{queryData.site.siteMetadata.title}</span>
      </Header>
      <Main>
        <h1>{pageContext.frontmatter.title}</h1>
        <Container>
          <ColorCards />
          {children}
          <br />
          {/* {pending ? <span>Pending...</span> : null} */}
          {geoLocation.error ? (
            <span>{geoLocation.error.message}</span>
          ) : (
            <pre>{JSON.stringify(geoLocation, null, 2)}</pre>
          )}
        </Container>
      </Main>
    </Layout>
  )
}

export default Skeleton
