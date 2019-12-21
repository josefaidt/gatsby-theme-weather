import React from 'react'
import Skeleton from '../components/Skeleton'
import Header from '../components/Header'
import Main from '../components/Main'

const DefaultLayout = props => {
  return (
    <Skeleton>
      <Header />
      <Main>
        <h1>hello</h1>
        <p>this is some text</p>
        {props.children}
      </Main>
    </Skeleton>
  )
}

export default DefaultLayout
