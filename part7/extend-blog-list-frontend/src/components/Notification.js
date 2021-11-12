import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector((state) => state.notification)

    if (!message || (!message?.success && !message?.error)) return null

    return (
        <div className={message?.error ? 'error' : 'success'}>
            {message?.success ? message?.success : message?.error}
        </div>
    )
}

export default Notification
