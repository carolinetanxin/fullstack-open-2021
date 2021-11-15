import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../style/Users.css'

const UsersPage = () => {
    const users = useSelector((state) => state.users)

    return (
        <div>
            <h1>Users</h1>
            <div className="users_table">
                <div className="users_table_thead">
                    <span>users</span>
                    <span>blogs creates</span>
                </div>
                <div className="users-table-tbody">
                    {users.map((user) => (
                        <div className="users_table_tr" key={user.id}>
                            <Link  to={`/users/${user.id}`}>{user.name}</Link>
                            <span>{user.blogs.length}</span>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default UsersPage
