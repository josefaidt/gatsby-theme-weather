import React from 'react'
import { css, Global } from '@emotion/core'
import { Layout, Header, Main, Container } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { useGeoState } from '../helpers/GeoLocation'
import ColorCards from './ColorCards'

const shortcodes = {
  ColorCards,
}

console.log('PROCESS ENV', process.env)

const Skeleton = ({ children, pageContext }) => {
  const { data: geo, pending, error } = useGeoState()
  const [weatherData, setWeatherData] = React.useState(null)
  React.useEffect(() => {
    async function fetchData() {
      const key = process.env.API_KEY
      const proxy = 'https://cors-anywhere.herokuapp.com'
      const url = `${proxy}/https://api.darksky.net/forecast/${key}`
      const { longitude, latitude } = geo
      const reqUrl = `${url}/${latitude},${longitude}`
      const response = await fetch(reqUrl)
      const data = await response.json()
      console.log('FETCHED DATA', data)
      await setWeatherData(data)
    }
    console.log(weatherData)
    const s = localStorage
    const cache = s.getItem('weather')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo, pending])
  const queryData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

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
          <MDXProvider components={shortcodes}>{children}</MDXProvider>
          <br />
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
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
