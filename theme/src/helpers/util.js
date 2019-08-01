const toLocalTime = unixTimestamp => {
  const currentDate = new Date(unixTimestamp * 1000)
  const currentTime = currentDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  return currentTime
}

export { toLocalTime }
