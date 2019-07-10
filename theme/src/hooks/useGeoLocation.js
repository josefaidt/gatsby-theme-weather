import React from 'react'

const useGeolocation = () => {
  const [state, setState] = React.useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  })
  let mounted = true
  let watchId

  const onEvent = event => {
    if (mounted) {
      setState({
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp,
      })
    }
  }

  const onEventError = error => {
    mounted && React.setState(oldState => ({ ...oldState, loading: false, error }))
  }

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onEventError)
    watchId = navigator.geolocation.watchPosition(onEvent, onEventError)

    return () => {
      mounted = false
      navigator.geolocation.clearWatch(watchId)
    }
  }, [0])

  return state
}

export default useGeolocation
