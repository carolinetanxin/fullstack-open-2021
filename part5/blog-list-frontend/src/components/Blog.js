import React, { useState } from 'react'

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
        updateObj.likes = updateObj.likes + 1
        updateBlog(updateObj)
    }

    const handleRemoveBlog = () => {
        const confirmRemove = window.confirm(`${blog.title} by ${blog.auth}`)
        if (confirmRemove) {
            const removeObj = { ...blog }
            removeBlog(removeObj)
        }
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title}
                <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
                <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
            </div>
            <div style={showWhenVisible}>
                <div>{blog.url}</div>
                <div>
                    <span>likes {blog.likes}</span>
                    <button onClick={handleLikeChange}>like</button>
                </div>
                <div>{blog.author}</div>
                <button onClick={handleRemoveBlog}>remove</button>
            </div>
        </div>
    )
}

export default Blog
