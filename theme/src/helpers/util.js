const toLocalTime = unixTimestamp => {
  const currentDate = new Date(unixTimestamp * 1000)
  const currentTime = currentDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  return currentTime
}

const toLocalDate = unixTimestamp => {
  const currentDate = new Date(unixTimestamp * 1000)
  return currentDate.toLocaleDateString([], { month: 'short', day: '2-digit', year: 'numeric' })
}

export { toLocalTime, toLocalDate }
