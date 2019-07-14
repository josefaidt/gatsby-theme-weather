import React from 'react'
import { graphql } from 'gatsby'
import { Styled } from 'theme-ui'
import Layout from '../components/layout'

const DefaultLayout = ({ pageContext }) => (
  <div>
    <Styled.h1>{pageContext.heading}</Styled.h1>
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
  </div>
)

export default DefaultLayout
