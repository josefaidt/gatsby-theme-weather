import React from 'react'

const defaultSettings = {
  enableHighAccuracy: true,
  timeout: 8000,
  // maximumAge: 0,
  maximumAge: Infinity,
}

const useGeolocation = (settings = defaultSettings) => {
  const [geo, setGeo] = React.useState({
    // accuracy: null,
    // altitude: null,
    // altitudeAccuracy: null,
    // heading: null,
    latitude: null,
    longitude: null,
    // speed: null,
    // timestamp: Date.now(),
  })
  const [error, setError] = React.useState(null)

  const onChange = event => {
    setGeo({
      // accuracy: event.coords.accuracy,
      // altitude: event.coords.altitude,
      // altitudeAccuracy: event.coords.altitudeAccuracy,
      // heading: event.coords.heading,
      latitude: event.coords.latitude.toFixed(4),
      longitude: event.coords.longitude.toFixed(4),
      // speed: event.coords.speed,
      // timestamp: event.timestamp,
    })
  }

  const onError = error => {
    setError(error)
  }

  React.useEffect(() => {
    const geo = navigator.geolocation
    if (!geo) {
      setError(`GeoLocation access is disabled`)
      return
    }
    // geo.getCurrentPosition(onChange, onError, settings)
    const watch = navigator.geolocation.watchPosition(onChange, onError, settings)

    return () => navigator.geolocation.clearWatch(watch)
  }, [settings])

  return { data: geo, error }
}

export default useGeolocation
