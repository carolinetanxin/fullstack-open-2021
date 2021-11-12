// bloglist列表里，每一条Blog的渲染
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({
    blog,
    updateBlog,
    removeBlog
    }) => {

    const blogStyle = {
        border: 'solid',
        borderWidth: 1,
        padding: 2,
        marginBottom: 5
    }

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleLikeChange = () => {
        const updateObj = { ...blog }
        updateBlog(updateObj)
    }

    const handleRemoveBlog = () => {
        const confirmRemove = window.confirm(`${blog.title} by ${blog.author}`)
        if (confirmRemove) {
            const removeObj = { ...blog }
            removeBlog(removeObj)
        }
    }

    return (
        <div style={blogStyle} className='blog'>
            <div>
                <Link to={`/blogs/${blog.id}`}>
                    <b>{blog.title}</b> by <i>{blog.author}</i>
                </Link>
                <button className='handleView' onClick={toggleVisibility} style={hideWhenVisible}>view</button>
                <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
            </div>
            <div className="blogDetail" style={showWhenVisible}>
                <div>{blog.url}</div>
                <div>
                    <span>likes </span>
                    <span className='likesNum'>{blog.likes}</span>
                    <button className='handleLike' onClick={handleLikeChange}>like</button>
                </div>
                <button onClick={handleRemoveBlog}>remove</button>
            </div>
        </div>
    )
}

export default Blog
