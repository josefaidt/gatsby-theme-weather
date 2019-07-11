import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'

const StyledLayout = styled.div`
  background-color: ${props => props.theme.main};
  color: black;
`

const DefaultLayout = ({ pageContext }) => (
  <Layout>
    <h1>{pageContext.heading}</h1>
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
  </Layout>
)

export default DefaultLayout
