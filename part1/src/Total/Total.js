import React from 'react'

const Total = (props) => {
    const sum = (list) => {
        let sum = 0;
        list.forEach(item => sum = sum+item.exercises);
        return sum;
    }
    const total = sum(props.parts);
    return(
        <div>
            <p>Number of exercises: {total}</p>
        </div>
    )
}

export default Total;
