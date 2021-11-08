import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: notification !== '' ? 2 : 0
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
