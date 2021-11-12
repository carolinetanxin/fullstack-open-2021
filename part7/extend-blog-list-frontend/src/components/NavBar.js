import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const NavBar = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.login)

    // logout
    const handleLoginOut = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(logout())
    }

    if (!user) {
        return null
    }

    return (
        <div>
            <h1>Blogs</h1>

            <p>
                {user?.username} logged in
                <button type='submit' onClick={handleLoginOut}>logout</button>
            </p>
        </div>
    )
}

export default NavBar
