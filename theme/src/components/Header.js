import React from 'react'
import { Renew32, Light32, Asleep32 } from '@carbon/icons-react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { useGeoState } from '../helpers/GeoContext'
import { useWeather } from '../helpers/WeatherContext'
import { useTheme } from '../helpers/ThemeContext'
import NavButton from './NavButton.css'

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.primary || 'white'};
  color: ${({ theme }) => theme.colors.background || 'black'};
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 1rem;
  padding: 1.2rem 1rem;
  border-radius: 0.65rem;
  width: 95vw;
  @media screen and (min-width: 959px) {
    width: 70vw;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  span {
    margin: 0;
  }

  .gtw--header-button__toggle {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-gap: 0.5rem;
  }
`

const Header = ({ children, title }) => {
  const [theme, themeDispatch] = useTheme()
  const [isRefreshing, setIsRefreshing] = React.useState(true)
  const geoState = useGeoState()
  const [weatherState, weatherDispatch] = useWeather()
  const queryData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  React.useEffect(() => {
    if (!geoState.pending && weatherState) {
      return setIsRefreshing(false)
    }
  }, [geoState.pending, weatherState])

  const refreshData = () => {
    setIsRefreshing(true)
    weatherDispatch({ type: 'clear' })
  }

  return (
    <StyledHeader theme={theme}>
      <h1>{title || queryData.site.siteMetadata.title}</h1>
      {children}
      <div className="gtw--header-button__toggle">
        <NavButton onClick={() => themeDispatch({ type: 'toggle' })}>
          {/* {theme.colors._current} */}
          {theme.colors._current === 'light' ? <Light32 /> : <Asleep32 />}
        </NavButton>
        <NavButton className={isRefreshing ? 'animate--spin' : ''} onClick={refreshData}>
          <Renew32 />
        </NavButton>
      </div>
    </StyledHeader>
  )
}

export default Header
