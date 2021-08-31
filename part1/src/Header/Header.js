import React from 'react'

const Header = (props) => {
    // return()要有最外面的根元素div
    // return[] 每行元素带逗号
    return(
        <h1>{props.course}</h1>
    )
}

export default Header;
