// bloglist列表里，每一条Blog的渲染
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

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
                <Button className='handleView'
                        onClick={toggleVisibility}
                        style={hideWhenVisible}>view</Button>
                <Button variant="secondary"
                        onClick={toggleVisibility}
                        style={showWhenVisible}>hide</Button>
            </div>

            <div className="blogDetail" style={showWhenVisible}>
                <div>{blog.url}</div>
                <div>
                    <span>likes </span>
                    <span className='likesNum'>{blog.likes}</span>
                    <Button variant="danger"
                            className='handleLike'
                            onClick={handleLikeChange}>like</Button>
                </div>
                <Button onClick={handleRemoveBlog}>remove</Button>
            </div>
        </div>
    )
}

export default Blog
