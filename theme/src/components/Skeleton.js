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

const Skeleton = ({ children, pageContext }) => {
  const queryData = useStaticQuery(gql`
    query {
      site {
        siteMetadata {
          title
          apiKey
        }
      }
    }
  `)

  const { data: geo, pending: geoPending, geoError } = useGeoState()
  const [weatherState, setWeatherState] = React.useState(null)
  const [fetchError, setFetchError] = React.useState(null)
  const dispatch = useWeatherDispatch()
  const fetchData = async () => {
    const proxy = 'https://cors-anywhere.herokuapp.com'
    const url = `${proxy}/https://api.darksky.net/forecast/${queryData.site.siteMetadata.apiKey}`
    const { longitude, latitude } = geo
    const reqUrl = `${url}/${latitude},${longitude}`
    const response = await fetch(reqUrl)
    const data = await response.json()
    if (data.error) {
      await setFetchError(data)
      await dispatch({ type: 'update', payload: { error: data.error } })
    } else {
      console.log('FETCHING: SETTING DATA')
      await setWeatherState(data)
      await localStorage.setItem('weather', JSON.stringify(data))
      await dispatch({ type: 'update', payload: data })
    }
  }
  React.useEffect(() => {
    console.log('WEATHER DATA STATE', weatherState)
    const s = localStorage
    const cache = s.getItem('weather')
    // console.log('CACHE IS', cache)
    if (!fetchError && !geoPending) {
      if (weatherState === null && cache === null) {
        // neither state nor cache exist, fetch data
        fetchData()
      } else if (weatherState === null && cache !== null) {
        // state not set, but cache exists
        // set state, then fetch to update
        console.info('Cache exists, setting state')
        const cacheData = JSON.parse(cache)
        // setData(cacheData)
        // setWeatherState(cacheData)
        dispatch({ type: 'update', payload: cacheData })
        fetchData()
      } else if (weatherState !== null && cache === null) {
        // this shouldn't happen
        // state is set, but cache is not
        // set cache
        console.warn('Unexpected weatherState state update, updating cache')
        localStorage.setItem('weather', JSON.stringify(cache))
      }
    } else if (!fetchError && geoPending && cache !== null) {
      // reach for cache if exists
      // TODO: rewrite since now handling cache fetch on context initialization
      const cacheData = JSON.parse(cache)
      setWeatherState(cacheData)
      dispatch({ type: 'update', payload: cacheData })
    } else if (fetchError && !geoPending && weatherState !== null) {
      // recovers from an error
      console.info('Recovering from fetching error')
      localStorage.setItem('weather', JSON.stringify(weatherState))
      // setData(weatherState)
      dispatch({ type: 'update', payload: weatherState })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, geoPending])

  const refreshData = async () => {
    await dispatch({ type: 'update', payload: { pending: true } })
    await fetchData()
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
          <p style={{ margin: 0 }}>Error: {fetchError.error || geoError}</p>
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
