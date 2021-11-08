import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import Filter from "./components/Filter"

import anecdotesService from "./services/anecdotes"
import {initialAnecdotes} from "./reducers/anecdoteReducer"

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(initialAnecdotes())
        anecdotesService.getAll().then(anecdotes => dispatch(initialAnecdotes(anecdotes)))
    }, [dispatch])

    return (
        <div>

            <h2>Anecdotes</h2>
            <Notification/>
            <Filter/>
            <AnecdoteList/>
            <AnecdoteForm/>

        </div>
    )
}

export default App
