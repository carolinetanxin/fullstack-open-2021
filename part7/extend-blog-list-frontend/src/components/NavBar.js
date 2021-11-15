import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import '../style/Navbar.css'

import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

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
        <Nav className="nav-bar" activeKey="/blogs">
            <Nav.Item>
                <Nav.Link href="/blogs">blogs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/users">users</Nav.Link>
            </Nav.Item>

            <Nav.Link eventKey="disabled" disabled>
                {user?.username} logged in
            </Nav.Link>
            <Button variant="link"
                    size="sm"
                    type="submit"
                    onClick={handleLoginOut}>Logout</Button>
        </Nav>
    )
}

export default NavBar
