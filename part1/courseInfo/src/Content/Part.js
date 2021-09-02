import React from 'react'
const Part = (props) => {
    const {name, exercises} = props.part;
    return(
        <div>
            <p>{name + ': ' + exercises}</p>
        </div>
    )
}

export default Part;
