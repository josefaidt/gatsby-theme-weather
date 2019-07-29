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
  React.useEffect(() => {
    async function fetchData() {
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
      }
    }
    console.log('WEATHER DATA STATE', weatherData)
    const s = localStorage
    const cache = s.getItem('weather')
    if (!error) {
      if (!pending && weatherData === null && cache === null) {
        fetchData()
      } else if (!pending && weatherData !== null) {
        if (cache && cache !== weatherData) {
          console.log('MADE IT HERE')
          localStorage.removeItem('weather')
          localStorage.setItem('weather', JSON.stringify(weatherData))
        } else {
          console.log('MADE IT ELSE')
          localStorage.setItem('weather', JSON.stringify(weatherData))
        }
      } else if (cache !== null && weatherData === null) {
        console.log('CACHE NOT NULL, SETTING WEATHERDATA')
        setWeatherData(JSON.parse(cache))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, pending])

  const refreshData = () => {
    setWeatherData(null)
    localStorage.removeItem('weather')
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
