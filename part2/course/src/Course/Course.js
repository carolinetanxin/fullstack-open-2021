import React from 'react';
import Header from "./Header/Header";
import Content from "./Content/Content";
import Total from "../Total/Total";

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course;
