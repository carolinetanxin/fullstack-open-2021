import React from 'react'

const Total = (props) => {
    const list = props.parts.map(part => part.exercises);
    const total = list.reduce((previousValue, currentValue) => {
        return previousValue + currentValue
    });
    return(
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}

export default Total;
