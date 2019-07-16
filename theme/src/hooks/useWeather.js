import React from 'react'

const defaultLocation = '37.8267,-122.4233'
const proxy = 'https://cors-anywhere.herokuapp.com'
const forecastUrl = key => `https://api.darksky.net/forecast/${key}`

const useDarkSkyWeather = (location, key) => {
  const [response, setResponse] = React.useState({})
  const [error, setError] = React.useState(null)
  const [pending, setPending] = React.useState(true)
  React.useEffect(() => {
    setPending(true)
    let reqUrl = ''
    const url = `${proxy}/${forecastUrl(key)}`
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
  }, [key, location])
  return { data: response, pending, error }
}

export default useDarkSkyWeather
