import React from 'react'
import {useDispatch, useSelector} from "react-redux"

import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = (() => {
    const dispatch = useDispatch()
    // state返回存储的整个状态
    // 使用combineReducers，要使用state.xxx返回存储的某个字段
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    console.log(filter)

    const filterAnecdotes = () => {
        if (filter === '') { return anecdotes }
        return anecdotes.filter((anecdote) => {
            return anecdote.content.toLowerCase().includes(filter.toLowerCase())
        })
    }

    const vote = (votedAnecdote) => {
        dispatch(voteAnecdote(votedAnecdote))
        dispatch(setNotification(`you voted ${votedAnecdote.content}`, 5))
    }

    return (
        <div>
            {filterAnecdotes()
                .sort((a, b) => a.votes - b.votes > 0 ? -1 : 1)
                .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
})

export default AnecdoteList
