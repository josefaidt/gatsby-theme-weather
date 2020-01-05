import React from 'react'
import styled, { ThemeContext } from 'styled-components'

const StyledNotificationToast = styled.div`
  /*  */
`

const NotificationToast = props => {
  const theme = React.useContext(ThemeContext)
  return (
    <StyledNotificationToast theme={theme}>
      <span>{props.text}</span>
    </StyledNotificationToast>
  )
}

NotificationToast.defaultProps = {
  text: "I'm a toast",
}

export default NotificationToast
