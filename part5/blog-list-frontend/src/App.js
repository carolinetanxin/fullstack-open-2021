import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newBlog, setNewBlog] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  // input value change
  const handleBlogChange = (event) => {
    setNewBlog((preValues) => {
      return {
        ...preValues,
        [event.target.name]: event.target.value
      }
    });
  }

  // create a blog
  const addBlog = (event) => {
    event.preventDefault(); // 阻止提交表单的默认操作
    console.log(newBlog)
    blogService.create(newBlog).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog(null);
    })
  }

  // 添加blog和展示bloglist
  const blogForm = () => {
    return (
        <div>
          <div className="login-in-title">
            <h2>blogs</h2>
            <p>
              {user.username} logged in
              <button type="submit" onClick={handleLoginOut}>logout</button>
            </p>
          </div>

          <div className="create-new-blog">
            <h2>create new</h2>
            <form onSubmit={addBlog}>
              <div>
                <label>title:</label>
                <input value={newBlog?.title} name="title" onChange={handleBlogChange} />
              </div>

              <div>
                <label>author:</label>
                <input value={newBlog?.author} name="author" onChange={handleBlogChange} />
              </div>

              <div>
                <label>url:</label>
                <input value={newBlog?.url} name="url" onChange={handleBlogChange} />
              </div>

              <button type="submit">create</button>
            </form>
          </div>

          <div className="blog-list">
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
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

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      await blogService.setToken(user.token)
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

  const handleLoginOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
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
