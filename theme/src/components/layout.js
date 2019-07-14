import React from 'react'
import { css, Global } from '@emotion/core'
import { Layout as StyledLayout, Header, Main, Container } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'

const Layout = ({ children, pageContext }) => {
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
        <Container>{children}</Container>
      </Main>
    </StyledLayout>
  )
}

export default Layout
