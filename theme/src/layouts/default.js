import React from 'react'
import Skeleton from '../components/Skeleton'
import Header from '../components/Header'
import Main from '../components/Main'

const DefaultLayout = ({ children }) => {
  return (
    <Skeleton>
      <Header />
      <Main>{children}</Main>
    </Skeleton>
  )
}

export default DefaultLayout
