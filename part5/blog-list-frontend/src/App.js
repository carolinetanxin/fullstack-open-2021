import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
                   onChange={({target}) => { setUsername(target.value) }}/>
          </div>
          <div>
            password
            <input type="password"
                   value={password}
                   name="Password"
                   onChange={({target}) => { setPassword(target.value) }}/>
          </div>
          <button type="submit">login</button>
        </form>
    )
  }

  // 展示bloglist
  const blogForm = () => {
    return (
        <div>
          <h2>blogs</h2>
          <p>{user.username} logged in</p>
          {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
          )}
        </div>
    )
  }

  // login
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('login in with', username, password)
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      console.log('login error')
      console.log(e)
    }
  }

  return (
    <div>
      {user === null ? (
          <div>
            <h2>log in to application</h2>
            {loginForm()}
          </div>
      ) : blogForm()}
    </div>
  )
}

export default App
