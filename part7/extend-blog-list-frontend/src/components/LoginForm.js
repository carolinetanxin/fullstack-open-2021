import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


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

            <Form onSubmit={login}>
                <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control type="text"
                           id="username"
                           value={user?.username}
                           name="username"
                           onChange={handleUserChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password"
                           id="password"
                           value={user?.password}
                           name="password"
                           onChange={handleUserChange}/>
                </Form.Group>
                <Button id="login-button" type="submit">login</Button>
            </Form>
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
