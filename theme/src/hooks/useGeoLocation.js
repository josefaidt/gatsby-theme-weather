import React from 'react'

const defaultSettings = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

const useGeolocation = (settings = defaultSettings) => {
  const [geo, setGeo] = React.useState({
    accuracy: null,
    // altitude: null,
    // altitudeAccuracy: null,
    // heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    // timestamp: Date.now(),
  })
  const [pending, setPending] = React.useState(true)
  const [error, setError] = React.useState(null)

  const onChange = event => {
    setGeo({
      accuracy: event.coords.accuracy,
      // altitude: event.coords.altitude,
      // altitudeAccuracy: event.coords.altitudeAccuracy,
      // heading: event.coords.heading,
      latitude: event.coords.latitude,
      longitude: event.coords.longitude,
      // speed: event.coords.speed,
      // timestamp: event.timestamp,
    })
    setPending(false)
  }

  const onError = error => {
    setError(error)
    setPending(false)
  }

  React.useEffect(() => {
    const geo = navigator.geolocation
    if (!geo) {
      setError(`GeoLocation access is disabled`)
      return
    }
    geo.getCurrentPosition(onChange, onError, settings)
  }, [settings])

  return { data: geo, pending, error }
}

export default useGeolocation
