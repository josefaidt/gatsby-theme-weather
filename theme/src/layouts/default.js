import React from 'react'
import Skeleton from '../components/Skeleton'
import Header from '../components/Header'
import Main from '../components/Main'
import useGeolocation from '../hooks/useGeoLocation'

const DefaultLayout = props => {
  const [data, setData] = React.useState(null)
  React.useEffect(() => {}, [])
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
