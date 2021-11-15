import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { createComment } from '../reducers/blogReducers'

import Button from 'react-bootstrap/Button'

const CommentForm = () => {
    const [inputValue, setInputValue] = useState(null)

    const dispatch = useDispatch()

    const match = useRouteMatch('/blogs/:id')
    const blogId = match ? match.params.id : null

    const handleInputChange = (event) => {
        setInputValue((preValue) => {
            return {
                ...preValue,
                [event.target.name]: event.target.value
            }
        })
    }

    const addComment = async (event) => {
        event.preventDefault()
        try {
            const title = inputValue?.comment

            const comment = { title }

            dispatch(createComment(blogId, comment))

            setInputValue({ comment: '' })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form onSubmit={addComment}>
            <input aria-label="Comment"
                   type="text"
                   name="comment"
                   value={inputValue?.comment || ''}
                   onChange={handleInputChange}/>
            <Button type="submit">Add comment</Button>
        </form>
    )
}

export default CommentForm
