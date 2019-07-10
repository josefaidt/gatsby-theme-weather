import React from 'react'

const defaultLocation = '37.8267,-122.4233'
const proxy = 'https://cors-anywhere.herokuapp.com'
const forecastUrl = `https://api.darksky.net/forecast/${process.env.API_KEY}`
const url = `${proxy}/${forecastUrl}`

const useDarkSkyWeather = location => {
  const [response, setResponse] = React.useState({})
  const [error, setError] = React.useState(null)
  const [pending, setPending] = React.useState(true)
  React.useEffect(() => {
    setPending(true)
    let reqUrl = ''
    if (!location || location === null) {
      reqUrl = `${url}/${defaultLocation}`
    } else {
      const longitude = location.longitude.toFixed(4)
      const latitude = location.latitude.toFixed(4)
      reqUrl = `${url}/${latitude},${longitude}`
    }
    fetch(reqUrl)
      .then(r => r.json())
      .then(data => {
        setResponse(data)
        setPending(false)
      })
      .catch(e => setError(new Error(e)))
  }, [location])
  return { data: response, pending, error }
}

export default useDarkSkyWeather
