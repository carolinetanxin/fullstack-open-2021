import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState(null)

    // input value change
    const handleBlogChange = (event) => {
        setNewBlog((preValues) => {
            return {
                ...preValues,
                [event.target.name]: event.target.value
            }
        })
    }

    const addBlog = async (event) => {
        event.preventDefault() // 阻止提交表单的默认操作
        createBlog(newBlog)
        setNewBlog(null)
    }

    return (
        <div className="create-new-blog">
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    <label>title:</label>
                    <input value={newBlog?.title}
                           name="title"
                           onChange={handleBlogChange} />
                </div>

                <div>
                    <label>author:</label>
                    <input value={newBlog?.author}
                           name="author"
                           onChange={handleBlogChange} />
                </div>

                <div>
                    <label>url:</label>
                    <input value={newBlog?.url}
                           name="url"
                           onChange={handleBlogChange} />
                </div>

                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
