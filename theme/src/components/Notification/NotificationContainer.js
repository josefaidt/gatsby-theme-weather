import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useCurrentTheme } from '../../helpers/ThemeContext'
import { useNotifications } from '../../helpers/NotificationContext'
import NotificationToast from './NotificationToast'

const StyledNotificationContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 9999;
  padding-right: 0.8rem;
  padding-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.6rem;
`

const NotificationContainer = ({ children, notifications }) => {
  const [notificationState, notificationDispatch] = useNotifications()
  const theme = useCurrentTheme()
  const onClose = notificationId => {
    return notificationDispatch({ type: 'toast_shown', payload: { id: notificationId } })
  }
  return (
    <StyledNotificationContainer>
      {children}
      {notificationState.length > 0 &&
        notificationState.map((n, i) => {
          return (
            <motion.div
              animate={{ y: -5, opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 1 }}
              className="gtw--notification-toast__container"
              key={n.id}
            >
              {!n.__internal.toast_shown ? <NotificationToast data={n} onClose={onClose} /> : null}
            </motion.div>
          )
        })}
    </StyledNotificationContainer>
  )
}

NotificationContainer.defaultProps = {
  notifications: [],
}

export default NotificationContainer
