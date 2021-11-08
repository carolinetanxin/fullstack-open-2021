import React from 'react'
import { connect } from "react-redux"

import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = ((props) => {

    const addAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";

        props.createAnecdote(content)
        props.setNotification(`you created ${content}`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
})

// dispatch代替useDispatch
const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

const ConnectedAnecdoteForm = connect(
    null, // 存储的状态
    mapDispatchToProps // 存储的函数
)(AnecdoteForm)
export default ConnectedAnecdoteForm
