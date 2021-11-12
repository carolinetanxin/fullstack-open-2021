import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import Notification from './Notification'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

const LoginPage = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    // login
    const handleLogin = async (event) => {
        try {
            const username = event.username
            const password = event.password
            console.log('login in with', username, password)

            const res = await dispatch(login(username, password))

            history.push('/')

            const user = res.data
            dispatch(setNotification({
                success: `hello, ${user.username}`
            }, 5))

            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            await blogService.setToken(user.token)
        } catch (error) {
            console.error(error)
            dispatch(setNotification({
                error: error.response.data.error
            }, 5))
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <Notification />
            <Togglable buttonLabel='log in'>
                <LoginForm handleSubmit={handleLogin} />
            </Togglable>
        </div>
    )
}

export default LoginPage
