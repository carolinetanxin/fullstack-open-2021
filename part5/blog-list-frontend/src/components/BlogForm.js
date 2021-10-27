import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    // 定义input时，一定要写明data的结构，不玩会报错。具体见下方链接
    // https://www.codingdeft.com/posts/react-controlled-uncontrolled/#uncontrolled-input
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: ''
    })

    // input value change
    const handleBlogChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setNewBlog((preValues) => {
            return {
                ...preValues,
                [name]: value
            }
        })
        // 不要直接引用event.target.xx，否则test将会报错
        // https://github.com/testing-library/react-testing-library/issues/908
        // It's caused due to the timing of when the state updater function runs.
        // setNewBlog((preValues) => {
        //     return {
        //         ...preValues,
        //         [event.target.name]: event.target.value
        //     }
        // })
    }

    const addBlog = (event) => {
        event.preventDefault() // 阻止提交表单的默认操作
        createBlog(newBlog)
        setNewBlog({
            title: '',
            author: '',
            url: ''
        })
    }

    return (
        <div className="create-new-blog">
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    <label>title:
                    <input value={newBlog?.title}
                           name="title"
                           className="title"
                           aria-label="title"
                           onChange={handleBlogChange} />
                    </label>
                </div>

                <div>
                    <label>author:
                    <input value={newBlog?.author}
                           name="author"
                           className="author"
                           id="author"
                           aria-label="author"
                           onChange={handleBlogChange} />
                    </label>
                </div>

                <div>
                    <label>url:
                    <input value={newBlog?.url}
                           name="url"
                           className="url"
                           aria-label="url"
                           onChange={handleBlogChange} />
                    </label>
                </div>

                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
