import React from 'react'
import { connect } from "react-redux"

import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = ((props) => {
    const filterAnecdotes = () => {
        if (props.filter === '') { return props.anecdotes }
        return props.anecdotes.filter((anecdote) => {
            return anecdote.content.toLowerCase().includes(props.filter.toLowerCase())
        })
    }

    const vote = (votedAnecdote) => {
        props.voteAnecdote(votedAnecdote)
        props.setNotification(`you voted ${votedAnecdote.content}`, 5)
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

// state代替useSelector
const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

// dispatch代替useDispatch
const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList
