import React from 'react'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { Layout, Header, Main, Container, Footer, jsx } from 'theme-ui'
import { useStaticQuery, graphql as gql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Renew32 } from '@carbon/icons-react'
import { useGeoState } from '../helpers/GeoContext'
import { useWeatherDispatch } from '../helpers/WeatherContext'
import useInterval from '../hooks/useInterval'
import shortcodes from './shortcodes'
import RefreshButton from './RefreshButton.css'

const StyledLayout = styled(Layout)`
  background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10L82 4l17.32 10zm-80 80l-1 1.732-17.32-10L2 84l17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10L62 24l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM111 40h-2V20h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zM40 49v2H20v-2h20zm19.32 5l-1 1.732-17.32-10L42 44l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM91 60h-2V40h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM39.32 74l-1 1.732-17.32-10L22 64l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM71 80h-2V60h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM120 89v2h-20v-2h20zm-84.134 9.16l-1.732 1-10-17.32 1.732-1 10 17.32zM51 100h-2V80h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM100 109v2H80v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM31 120h-2v-20h2v20z' fill='%23a09d9e' fill-opacity='0.14' fill-rule='evenodd'/%3E%3C/svg%3E");
`

const Skeleton = ({ children, pageContext }) => {
  const queryData = useStaticQuery(gql`
    query {
      site {
        siteMetadata {
          title
          apiKey
          refreshInterval
        }
      }
    }
  `)

  const { data: geo, pending: geoPending, geoError } = useGeoState()
  const [weatherState, setWeatherState] = React.useState(null)
  const [fetchError, setFetchError] = React.useState(null)
  const dispatch = useWeatherDispatch()
  const fetchData = async (latitude, longitude) => {
    const proxy = 'https://cors-anywhere.herokuapp.com'
    const url = `${proxy}/https://api.darksky.net/forecast/${queryData.site.siteMetadata.apiKey}`
    const reqUrl = `${url}/${latitude},${longitude}`
    const response = await fetch(reqUrl)
    const data = await response.json()
    if (data.error) {
      await setFetchError(data.error)
      await dispatch({ type: 'update', payload: { error: data.error } })
    } else {
      console.log('FETCHING: SETTING DATA')
      await setWeatherState(data)
      await localStorage.setItem('weather', JSON.stringify(data))
      await dispatch({ type: 'update', payload: { ...data, error: null } })
      // wipe FetchError if previously existed
      await setFetchError(null)
    }
  }
  console.log(geo, geoPending, geoError)
  console.log('GEO CACHE', JSON.parse(localStorage.getItem('location')))
  React.useEffect(() => {
    console.log('WEATHER DATA STATE', weatherState)
    const s = localStorage
    const cache = s.getItem('weather')
    // console.log('CACHE IS', cache)
    if (!fetchError && !geoPending) {
      if (weatherState === null && cache === null) {
        // neither state nor cache exist, fetch data
        fetchData(geo.latitude, geo.longitude)
      } else if (weatherState === null && cache !== null) {
        // state not set, but cache exists
        // set state, then fetch to update
        console.info('Cache exists, setting state')
        const cacheData = JSON.parse(cache)
        const { data: geoCache } = JSON.parse(localStorage.getItem('location'))
        dispatch({ type: 'update', payload: cacheData })
        if (geoCache.latitude && geoCache.longitude) {
          fetchData(geoCache.latitude, geoCache.longitude)
        } else {
          fetchData(geo.latitude, geo.longitude)
        }
      } else if (weatherState !== null && cache === null) {
        // this shouldn't happen
        // state is set, but cache is not
        // set cache
        console.warn('Unexpected weatherState state update, updating cache')
        localStorage.setItem('weather', JSON.stringify(cache))
      }
    } else if (fetchError && !geoPending && weatherState !== null) {
      // recovers from an error
      console.info('Recovering from fetching error')
      localStorage.setItem('weather', JSON.stringify(weatherState))
      // setData(weatherState)
      dispatch({ type: 'update', payload: weatherState })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, geoPending])

  const interval = queryData.site.siteMetadata.refreshInterval
  useInterval(() => {
    console.info(`Setting fetch interval for ${interval} minutes`)
    refreshData()
  }, interval * 60 * 1000)

  const refreshData = async () => {
    await dispatch({ type: 'update', payload: { pending: true } })
    await fetchData(geo.latitude, geo.longitude)
  }

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
        <span>{queryData.site.siteMetadata.title}</span>
        {fetchError || geoError ? (
          <p style={{ margin: 0 }}>Error: {fetchError || geoError}</p>
        ) : null}
        <RefreshButton
          className={(geoPending || weatherState === null) && !fetchError ? 'animate' : ''}
          onClick={refreshData}
        >
          <Renew32 />
        </RefreshButton>
      </Header>
      <Main>
        <h1>{pageContext.frontmatter.title}</h1>
        <Container>
          <MDXProvider components={shortcodes}>{children}</MDXProvider>
        </Container>
      </Main>
      <Footer>
        <a href="https://darksky.net/poweredby/" rel="noreferrer noopener" target="_blank">
          Powered by Dark Sky
        </a>
      </Footer>
    </StyledLayout>
  )
}

export default Skeleton
