import React from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useNotifications } from '../../helpers/NotificationContext'

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

  .gtw--notification-toast {
    background-color: ${({ theme }) => theme.colors.background || 'white'};
    width: 24rem;
    position: relative;
    /* border: 1px solid red; */

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    padding-left: 1.3rem;

    .gtw--notification-toast--title {
      margin-top: 0.2rem
      margin-bottom: 0.8rem;
    }
    .gtw--notification-toast--description {
      margin-bottom: 0.2rem;
      font-size: 90%;
    }
    .gtw--notification-toast--type {
      position: absolute;
      left: 0.1rem;
      top: 0.1rem;
    }

    button#gtw--notification-toast--button__close {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      
      display: flex;
      justify-content: center;
      align-items: center;

      width: 1.5rem;
      height: 1.3rem;
      border: none;
      border-radius: 0.125rem;
      
      svg {
        height: 0.5rem;
        width: 0.5rem;
        line {
          stroke: ${({ theme }) => theme.colors.text || 'black'};
        }
      }

      transition: all 0.3s ease;
      &:hover {
        transition: all 0.3s ease;
        background-color: ${({ theme }) => `${theme.colors.text}b3` || '#bbbbbbcc'};
        svg line {
          stroke: ${({ theme }) => theme.colors.background || 'white'};
        }
      }

    }
  }
`

const NotificationContainer = ({ children, notifications }) => {
  const [notificationState, notificationDispatch] = useNotifications()
  const theme = React.useContext(ThemeContext)
  const onClose = notificationId => {
    return notificationDispatch({ type: 'toast_shown', payload: { id: notificationId } })
  }
  const getTypeColor = type => {
    switch (type) {
      case 'error':
        return theme.colors.primary
      case 'warning':
        return theme.colors.secondary
      case 'info':
        return theme.colors.info
      case 'success':
        return theme.colors.success
      default:
        return theme.colors.text
    }
  }
  return (
    <StyledNotificationContainer>
      {children}
      {notificationState.length &&
        notificationState.map(n => {
          const typeColor = getTypeColor(n.type)
          return (
            <>
              {!n.__internal.toast_shown ? (
                <div className="gtw--notification-toast" key={n.id}>
                  <svg className="gtw--notification-toast--type" fill={typeColor}>
                    <circle cx="0.45rem" cy="0.55rem" r="0.22rem"></circle>
                  </svg>
                  <h4 className="gtw--notification-toast--title">{n.content.title}</h4>
                  <p className="gtw--notification-toast--description">{n.content.description}</p>
                  <button id="gtw--notification-toast--button__close" onClick={e => onClose(n.id)}>
                    <svg width="20" height="20">
                      <line x1="0" x2="100%" y1="0" y2="100%" stroke="black"></line>
                      <line x1="100%" x2="0" y1="0" y2="100%" stroke="black"></line>
                    </svg>
                  </button>
                </div>
              ) : null}
            </>
          )
        })}
    </StyledNotificationContainer>
  )
}

NotificationContainer.defaultProps = {
  notifications: [],
}

export default NotificationContainer
