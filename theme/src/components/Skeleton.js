import React from 'react'
import { css, Global } from '@emotion/core'
import { Layout, Header, Main, Container } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { useGeoState } from '../helpers/GeoLocation'
import Card from './Card'

const Skeleton = ({ children, pageContext }) => {
  const geoLocation = useGeoState()
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
    <Layout>
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
          <Card />
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