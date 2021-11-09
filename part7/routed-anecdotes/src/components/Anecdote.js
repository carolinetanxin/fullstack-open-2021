import {useParams} from "react-router";
import React from "react";

const Anecdote = ({anecdotes}) => {
    const id = useParams().id
    const anecdote = anecdotes.find(a => a.id === id)
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <div>has {anecdote.votes} votes</div>
            <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
        </div>
    )
}

export default Anecdote
