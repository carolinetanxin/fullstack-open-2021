import React from 'react'
import {useDispatch, useSelector} from "react-redux"

import { filterChange } from "../reducers/filterReducer"

const Filter = (() => {
    const dispatch = useDispatch()
    // state返回存储的整个状态
    // 使用combineReducers，要使用state.xxx返回存储的某个字段
    const filter = useSelector(state => state.filter)

    const handleChange = (event) => {
        const filterValue = event.target.value
        dispatch(filterChange({filter: filterValue}))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            <label htmlFor="filter">Filter</label>
            <input id="filter" onChange={handleChange} />
        </div>
    );
})

export default Filter
