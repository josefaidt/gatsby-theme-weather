import React from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { useGeoState } from '../helpers/GeoContext'
import { useWeather } from '../helpers/WeatherContext'
import useInterval from '../hooks/useInterval'
import NotificationContainer from './Notification'

const StyledLayout = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10L82 4l17.32 10zm-80 80l-1 1.732-17.32-10L2 84l17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10L62 24l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM111 40h-2V20h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zM40 49v2H20v-2h20zm19.32 5l-1 1.732-17.32-10L42 44l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM91 60h-2V40h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM39.32 74l-1 1.732-17.32-10L22 64l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM71 80h-2V60h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM120 89v2h-20v-2h20zm-84.134 9.16l-1.732 1-10-17.32 1.732-1 10 17.32zM51 100h-2V80h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM100 109v2H80v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM31 120h-2v-20h2v20z' fill='%23a09d9e' fill-opacity='0.14' fill-rule='evenodd'/%3E%3C/svg%3E");

  overflow-x: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;

  .powered-by {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  pre {
    color: ${({ theme }) => theme.colors.text || 'black'};
  }
`

const Skeleton = ({ children, title }) => {
  const geoState = useGeoState()
  const [weatherState, weatherDispatch] = useWeather()
  const query = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          refreshInterval
        }
      }
    }
  `)

  React.useEffect(() => {
    const getWeather = async () => {
      const res = await fetch(
        `https://api.weather.gov/points/${geoState.data.latitude},${geoState.data.longitude}`
      )
      const data = await res.json()
      return weatherDispatch({ type: 'update', payload: data })
    }
    if (!weatherState && geoState.data.latitude) {
      getWeather()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoState, weatherState])

  const refreshData = () => {
    return weatherDispatch({ type: 'clear' })
  }

  const interval = query.site.siteMetadata.refreshInterval
  useInterval(() => {
    refreshData()
  }, interval * 60 * 1000)

  return (
    <StyledLayout>
      {children}
      <div className="powered-by">
        <a href="https://weather.gov" rel="noreferrer noopener" target="_blank">
          Powered by weather.gov
        </a>
      </div>
      <NotificationContainer />
    </StyledLayout>
  )
}

export default Skeleton
