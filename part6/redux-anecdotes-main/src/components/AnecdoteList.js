import React from 'react'
import {useDispatch, useSelector} from "react-redux"

import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = (() => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const vote = (votedAnecdote) => {
        dispatch(voteAnecdote(votedAnecdote))
    }

    return (
        <div>
            {anecdotes
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
