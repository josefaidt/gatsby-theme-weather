import React from 'react'

const defaultLocation = '37.8267,-122.4233'
const proxy = 'https://cors-anywhere.herokuapp.com'
const forecastUrl = key => `https://api.darksky.net/forecast/${key}`

const useDarkSkyWeather = (location = defaultLocation, key = process.env.API_KEY) => {
  const [response, setResponse] = React.useState({})
  const [error, setError] = React.useState(null)
  const [pending, setPending] = React.useState(true)
  React.useEffect(() => {
    setPending(true)
    let reqUrl = ''
    const url = `${proxy}/https://api.darksky.net/forecast/${key}`
    const { longitude, latitude } = location
    reqUrl = `${url}/${latitude},${longitude}`
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
