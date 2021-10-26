import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {
    const [user, setUser] = useState(null)

    // input value change
    const handleUserChange = (event) => {
        setUser((preValues) => {
            return {
                ...preValues,
                [event.target.name]: event.target.value
            }
        })
    }

    const login = async (event) => {
        event.preventDefault() // 阻止提交表单的默认操作
        handleSubmit(user)
        setUser(null)
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={login}>
                <div>
                    username
                    <input type="text"
                           value={user?.username}
                           name="username"
                           onChange={handleUserChange}/>
                </div>
                <div>
                    password
                    <input type="password"
                           value={user?.password}
                           name="password"
                           onChange={handleUserChange}/>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    // username: PropTypes.string.isRequired,
    // password: PropTypes.string.isRequired,
    // handleUsernameChange: PropTypes.func.isRequired,
    // handlePasswordChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
