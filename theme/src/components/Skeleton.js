import React from 'react'
import { css, Global } from '@emotion/core'
import { Layout, Header, Main, Container, Footer } from 'theme-ui'
import { useStaticQuery, graphql as gql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { Renew32 } from '@carbon/icons-react'
import { useGeoState } from '../helpers/GeoContext'
import { useWeatherDispatch } from '../helpers/WeatherContext'
import shortcodes from './shortcodes'
import RefreshButton from './RefreshButton.css'

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef()

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

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
      await dispatch({ type: 'update', payload: data })
    }
  }
  console.log(geo)
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
    <Layout>
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
    </Layout>
  )
}

export default Skeleton
