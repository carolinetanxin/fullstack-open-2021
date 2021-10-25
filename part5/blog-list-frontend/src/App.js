import React, {useState, useEffect, useRef} from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from "./components/BlogForm"

import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs.sort((a, b) => b.likes - a.likes))
        )
    }, [])

    // check if store logged user info
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    // 登录表单
    const loginForm = () => {
        return (
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input type="text"
                           value={username}
                           name="Username"
                           onChange={({target}) => {
                               setUsername(target.value)
                           }}/>
                </div>
                <div>
                    password
                    <input type="password"
                           value={password}
                           name="Password"
                           onChange={({target}) => {
                               setPassword(target.value)
                           }}/>
                </div>
                <button type="submit">login</button>
            </form>
        )
    }

    // 添加blog和展示bloglist
    const blogForm = () => {
        return (
            <div>
                <div className="login-in-title">
                    <h2>blogs</h2>


                    <Notification successMessage={successMessage} errorMessage={errorMessage}/>

                    <p>
                        {user.username} logged in
                        <button type="submit" onClick={handleLoginOut}>logout</button>
                    </p>
                </div>

                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog}/>
                </Togglable>

                <div className="blog-list">
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog}
                              updateBlog={updateBlog}
                              removeBlog={removeBlog}/>
                    )}
                </div>
            </div>
        )
    }

    // login
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('login in with', username, password)
        try {
            const user = await loginService.login({username, password})
            setSuccessMessage(`hello, ${user.username}`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)

            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            await blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLoginOut = () => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
    }

    // create a blog
    const addBlog = async (newBlog) => {
        try {
            const returnedBlog = await blogService.create(newBlog)
            setBlogs(blogs.concat(returnedBlog));
            setSuccessMessage(`${newBlog.title} by ${newBlog.author}`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)
        } catch (error) {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    // update blog props
    const updateBlog = async (updateBlog) => {
        try {
            const updateObj = {
                likes: updateBlog.likes
            }

            const updatedBlog = await blogService.update(updateBlog.id, updateObj)
            const returnedBlog = await blogService.getAll()
            setBlogs(returnedBlog);
            setSuccessMessage(`${updateBlog.title} by ${updateBlog.author} likes update`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)
        } catch (error) {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    // remove blog props
    const removeBlog = async (removeBlog) => {
        try {
            const removedBlog = await blogService.remove(removeBlog.id)
            setBlogs(blogs.filter(blog => blog.id !== removeBlog.id).sort((a, b) => b.likes - a.likes))
            setSuccessMessage(`${removeBlog.title} by ${removeBlog.author} deleted`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)
        } catch (error) {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            {user === null ? (
                <div>
                    <h2>log in to application</h2>
                    <Notification successMessage={successMessage} errorMessage={errorMessage}/>
                    {loginForm()}
                </div>
            ) : blogForm()}
        </div>
    )
}

export default App
