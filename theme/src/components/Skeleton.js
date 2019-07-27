import React from 'react'
import { css, Global } from '@emotion/core'
import { Layout, Header, Main, Container } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import useWeather from '../hooks/useWeather'
import { useGeoState } from '../helpers/GeoLocation'
import ColorCards from './ColorCards'

const defaultLocation = '37.8267,-122.4233'
const proxy = 'https://cors-anywhere.herokuapp.com'

const Skeleton = ({ children, pageContext }) => {
  const { data: geo, pending, error } = useGeoState()
  const [weatherData, setWeatherData] = React.useState(null)
  console.log({ geo, pending, error })
  React.useEffect(() => {
    async function fetchData() {
      const key = process.env.API_KEY
      let reqUrl = ''
      const url = `${proxy}/https://api.darksky.net/forecast/${key}`
      const { longitude, latitude } = geo
      reqUrl = `${url}/${latitude},${longitude}`
      const response = await fetch(reqUrl)
      const data = await response.json()
      console.log('DONE')
      await setWeatherData(data)
    }
    if (!pending) {
      fetchData()
    } else {
      console.log('STILL PENDING')
    }
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
          <ColorCards />
          {children}
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
