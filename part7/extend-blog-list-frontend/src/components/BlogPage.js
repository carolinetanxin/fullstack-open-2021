// 添加blog和展示bloglist
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './Notification'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

import { setNotification } from '../reducers/notificationReducer'
import { addLike, createBlog, removeBlog } from '../reducers/blogReducers'

const BlogPage = () => {
    const dispatch = useDispatch()

    const blogFormRef = useRef()

    const blogs = useSelector((state) => state.blogs)

    // create a blog
    const addBlog = async (newBlog) => {
        try {
            // hide form after adding a blog
            blogFormRef.current.toggleVisibility()

            dispatch(createBlog(newBlog))

            dispatch(setNotification({
                success: `${newBlog.title} by ${newBlog.author}`
            }, 5))
        } catch (error) {
            dispatch(setNotification({
                error: error.response.data.error
            }, 5))
            console.error(error)
        }
    }

    // update blog props
    const updateBlog = async (updateBlog) => {
        try {
            const updateObj = {
                likes: updateBlog.likes
            }

            dispatch(addLike(updateBlog.id, updateObj))

            dispatch(setNotification({
                success: `${updateBlog.title} by ${updateBlog.author} likes update`
            }, 5))
        } catch (error) {
            dispatch(setNotification({
                error: error.response.data.error
            }, 5))
            console.error(error)
        }
    }

    // remove blog props
    const deleteBlog = async (removedBlog) => {
        try {

            await dispatch(removeBlog(removedBlog.id))

            dispatch(setNotification({
                success: `${removedBlog.title} by ${removedBlog.author} deleted`
            }, 5))
        } catch (error) {
            dispatch(setNotification({
                error: error.response.data.error
            }, 5))
            console.error(error)
        }
    }



    return (
        <div>
            <div className='login-in-title'>
                <Notification />
            </div>

            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog}/>
            </Togglable>

            <div className='blog-list'>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}
                          updateBlog={updateBlog}
                          removeBlog={deleteBlog} />
                )}
            </div>
        </div>
    )
}

export default BlogPage
