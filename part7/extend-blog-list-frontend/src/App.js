import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch, Route
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { initBlogs } from './reducers/blogReducers'
import { initUsers } from './reducers/userReducer'

import blogService from './services/blogs'

import LoginPage from './components/LoginPage'
import NavBar from './components/NavBar'

import UsersPage from './components/Users'
import User from './components/User'

import BlogPage from './components/BlogPage'
import BlogView from './components/BlogView'


const App = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.login)

    useEffect(() => {
        dispatch(initBlogs())
        dispatch(initUsers())
    }, [dispatch])

    // check if store logged user info
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user?.token)
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService.setToken(user?.token)
    }, [user])

    return (
        <Router>
            <NavBar/>

            <Switch>
                <Route path="/users/:id">
                    <User/>
                </Route>
                <Route path="/users">
                    <UsersPage/>
                </Route>
                <Route path="/blogs/:id">
                    <BlogView/>
                </Route>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <Route path="/" render={() => user ? <BlogPage/> : <LoginPage/>}></Route>
            </Switch>

        </Router>
    )
}

export default App
