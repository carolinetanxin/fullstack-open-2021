import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
    const users = useSelector((state) => state.users)

    const match = useRouteMatch('/users/:id')
    const user = match ? users?.find(user => user.id === match.params.id) : null

    // console.log(match, user)

    if (!user) {
        return null
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            {user.blogs.length === 0
                ? <p>no blogs add</p>
                : user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
        </div>
    )
}

export default User
