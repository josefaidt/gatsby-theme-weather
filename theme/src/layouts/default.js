import React from 'react'
import Skeleton from '../components/Skeleton'
import Header from '../components/Header'
import Main from '../components/Main'

const DefaultLayout = props => {
  return (
    <Skeleton>
      <Header />
      <Main>
        <h1>this is the default layout</h1>
        {props.children}
      </Main>
    </Skeleton>
  )
}

export default DefaultLayout
