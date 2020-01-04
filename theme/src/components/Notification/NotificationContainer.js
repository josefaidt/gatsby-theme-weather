import React from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useNotifications } from '../../helpers/NotificationContext'

const StyledNotificationContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 9999;

  .gtw--notification-toast {
    background-color: ${({ theme }) => theme.colors.background || 'white'};
    width: 24rem;
    border: 1px solid red;
  }
`

const NotificationContainer = ({ children, notifications }) => {
  const [notificationState, notificationDispatch] = useNotifications()
  const onClose = notificationId => {
    return notificationDispatch({ type: 'toast_shown', payload: { id: notificationId } })
  }
  return (
    <StyledNotificationContainer>
      {children}
      {notificationState.length &&
        notificationState.map(n => (
          <>
            {!n.__internal.toast_shown ? (
              <div className="gtw--notification-toast" key={n.id}>
                <h5>{n.content.title}</h5>
                <p>{n.content.description}</p>
                <button onClick={e => onClose(n.id)}>x</button>
              </div>
            ) : null}
          </>
        ))}
    </StyledNotificationContainer>
  )
}

NotificationContainer.defaultProps = {
  notifications: [],
}

export default NotificationContainer
