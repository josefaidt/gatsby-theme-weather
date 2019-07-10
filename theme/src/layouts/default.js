import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

// const DefaultLayout = props => <div style={{ color: 'red' }} {...props}></div>

const DefaultLayout = ({ children }) => {
  // const view = data.allFile
  return (
    <Layout>
      <div>
        <h1>HEADER FROM THEME</h1>
        <div>{children}</div>
      </div>
    </Layout>
  )
}

export default DefaultLayout
