import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router'
import { addLike, removeBlog } from '../reducers/blogReducers'
import { setNotification } from '../reducers/notificationReducer'
import Comment from './Comment'
import CommentForm from './CommentForm'

import Button from 'react-bootstrap/Button'

const BlogView = () => {
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const history = useHistory()

    const match = useRouteMatch('/blogs/:id')
    const blog = match ? blogs?.find(blog => blog.id === match.params.id) : null

    if (!blog) {
        return null
    }

    const handleLikeChange = async () => {
        const updateBlog = { ...blog }
        try {
            const updateObj = {
                likes: updateBlog.likes,
                user: blog.user?.id || user // 是否需要使用user，待测试
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

    const handleRemoveBlog = async () => {
        const confirmRemove = window.confirm(`${blog.title} by ${blog.author}`)
        if (confirmRemove) {
            const removedBlog = { ...blog }
            try {

                await dispatch(removeBlog(removedBlog.id))
                history.push('/blogs')

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
    }

    return (
        <div>
            <h1>{blog.title} {blog.author}</h1>
            <a href={blog.url}>
                {blog.url}
            </a>
            <div>
                <span>likes </span>
                <span className='likesNum'>{blog.likes}</span>
                <Button variant="danger"
                        className='handleLike'
                        onClick={handleLikeChange}>like</Button>
            </div>
            <div>
                <span>Added by </span>
                <span>{blog.user?.name}</span>
            </div>
            <Button variant="warning"
                    onClick={handleRemoveBlog}>remove</Button>

            <div className="comments">
                <h2>comments</h2>
                <CommentForm />
                {blog.comments && blog.comments.length !== 0 ? (
                    <ul>
                        {blog.comments.map((comment) => (
                            <Comment key={comment.id} comment={comment}/>
                        ))}
                    </ul>
                ) : (
                    <span>Add the first comment.</span>
                )}
            </div>
        </div>
    )
}

export default BlogView
