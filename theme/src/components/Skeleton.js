import React from 'react'
import { css, Global } from '@emotion/core'
import { Layout, Header, Main, Container } from 'theme-ui'
import { useStaticQuery, graphql as gql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { useGeoState } from '../helpers/GeoContext'
import { WeatherProvider, useWeatherDispatch, useWeather } from '../helpers/WeatherContext'
// import { useKey } from '../helpers/key'
import ColorSwatch from './ColorSwatch'
import WCurrently from './w-currently'

const shortcodes = {
  ColorSwatch,
  WCurrently,
}

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

  const { data: geo, pending, geoError } = useGeoState()
  // const key = useKey()
  const [weatherData, setWeatherData] = React.useState(null)
  const [fetchError, setFetchError] = React.useState(null)
  const dispatch = useWeatherDispatch()
  const weatherState = useWeather()
  const fetchData = async () => {
    const proxy = 'https://cors-anywhere.herokuapp.com'
    const url = `${proxy}/https://api.darksky.net/forecast/${queryData.site.siteMetadata.apiKey}`
    const { longitude, latitude } = geo
    const reqUrl = `${url}/${latitude},${longitude}`
    const response = await fetch(reqUrl)
    const data = await response.json()
    if (data.error) {
      await setFetchError(data)
    } else {
      console.log('FETCHING: SETTING DATA')
      await setWeatherData(data)
      await localStorage.setItem('weather', JSON.stringify(data))
      await dispatch({ type: 'update', payload: data })
    }
  }
  React.useEffect(() => {
    console.log('WEATHER DATA STATE', weatherData)
    const s = localStorage
    const cache = s.getItem('weather')
    // console.log('CACHE IS', cache)
    if (!fetchError && !pending) {
      if (weatherData === null && cache === null) {
        // neither state nor cache exist, fetch data
        fetchData()
      } else if (weatherData === null && cache !== null) {
        // state not set, but cache exists
        // set state, then fetch to update
        console.info('Cache exists, setting state')
        const cacheData = JSON.parse(cache)
        // setData(cacheData)
        // setWeatherData(cacheData)
        dispatch({ type: 'update', payload: cacheData })
        fetchData()
        // if (cache) console.log('UPDATING CACHE')
        // localStorage.setItem('weather', JSON.stringify(weatherData))
      } else if (weatherData !== null && cache === null) {
        // this shouldn't happen
        // state is set, but cache is not
        // set cache
        console.warn('Unexpected WeatherData state update, updating cache')
        localStorage.setItem('weather', JSON.stringify(cache))
      }
    } else if (!fetchError && pending) {
      const cacheData = JSON.parse(cache)
      // setData(cacheData)
      // setWeatherData(cacheData)
      console.log('SOMEHOW MADE IT HERE')
      dispatch({ type: 'update', payload: cacheData })
    } else if (fetchError && !pending && weatherData !== null) {
      // recovers from an error
      console.info('Recovering from fetching error')
      localStorage.setItem('weather', JSON.stringify(weatherData))
      // setData(weatherData)
      dispatch({ type: 'update', payload: weatherData })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, pending])

  const refreshData = () => {
    fetchData()
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
      </Header>
      <Main>
        <h1>{pageContext.frontmatter.title}</h1>
        <Container>
          <div
            style={{
              // display: 'flex',
              // flexDirection: 'column',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              textAlign: 'right',
              margin: '1rem 0',
            }}
          >
            <button onClick={refreshData}>REFRESH</button>
            <a href="#w-context">Context Data</a>
            <a href="#w-state">State Data</a>
          </div>
          <MDXProvider components={shortcodes}>{children}</MDXProvider>
          <br />
          <h4 id="w-context">WEATHER CONTEXT STATE</h4>
          <pre>{JSON.stringify(weatherState, null, 2)}</pre>
          ---
          <h4 id="w-state">WEATHER FETCH STATE</h4>
          {fetchError ? (
            <pre>{JSON.stringify(fetchError, null, 2)}</pre>
          ) : (
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
          )}
          {/* {pending ? <span>Pending...</span> : null} */}
          {/* {geoLocation.error ? (
            <span>{geoLocation.error.message}</span>
          ) : (
            <pre>{JSON.stringify(geoLocation, null, 2)}</pre>
          )} */}
        </Container>
      </Main>
    </Layout>
  )
}

export default Skeleton
