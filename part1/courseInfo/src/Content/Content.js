import React from 'react'
import Part from "./Part";

const Content = (props) => {
    // 遍历渲染Part组件
    const listItems = props.parts.map((part, index) =>  <Part part={part} key={index}/>)
    return(
        <div>
            {listItems}
        </div>
    )
}

export default Content;
