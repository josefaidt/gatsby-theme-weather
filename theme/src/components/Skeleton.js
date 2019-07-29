import React from 'react'
import { css, Global } from '@emotion/core'
import { Layout, Header, Main, Container } from 'theme-ui'
import { useStaticQuery, graphql as gql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { useGeoState } from '../helpers/GeoContext'
import { useWeatherDispatch, useWeatherState } from '../helpers/WeatherContext'
// import { useKey } from '../helpers/key'
import ColorCards from './ColorCards'

const shortcodes = {
  ColorCards,
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
  const [error, setError] = React.useState(null)
  const fetchData = async () => {
    const proxy = 'https://cors-anywhere.herokuapp.com'
    const url = `${proxy}/https://api.darksky.net/forecast/${queryData.site.siteMetadata.apiKey}`
    const { longitude, latitude } = geo
    const reqUrl = `${url}/${latitude},${longitude}`
    const response = await fetch(reqUrl)
    const data = await response.json()
    if (data.error) {
      await setError(data)
    } else {
      await setWeatherData(data)
      await localStorage.setItem('weather', JSON.stringify(data))
    }
  }
  React.useEffect(() => {
    console.log('WEATHER DATA STATE', weatherData)
    const s = localStorage
    const cache = s.getItem('weather')
    // console.log('CACHE IS', cache)
    if (!error && !pending) {
      if (weatherData === null && cache === null) {
        // neither state nor cache exist, fetch data
        fetchData()
      } else if (weatherData === null && cache !== null) {
        // state not set, but cache exists
        // set state, then fetch to update
        setWeatherData(JSON.parse(cache))
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
    } else if (!error && pending) {
      setWeatherData(JSON.parse(cache))
    } else if (error && !pending && weatherData !== null) {
      // recovers from an error
      console.info('Recovering from fetching error')
      localStorage.setItem('weather', JSON.stringify(weatherData))
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
          <button onClick={refreshData}>REFRESH</button>
          <MDXProvider components={shortcodes}>{children}</MDXProvider>
          <br />
          <h4>Currently it is...</h4>
          {error ? (
            <pre>{JSON.stringify(error, null, 2)}</pre>
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
