import React, {useState} from 'react'

import Header from "./Header/Header";
import Content from "./Content/Content";
import Total from "./Total/Total";

import Display from "./Counter/Display/Display";
import Button from "./Counter/Button/Button";
import Histroy from "./Counter/History/Histroy";

// course and exercises
const App1 = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

// counter
const App2 = () => {
    const [counter, setCounter] = useState(0);

    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    return (
        <div>
            <Display counter={counter}/>
            <Button onClick={increaseByOne} text='plus'/>
            <Button onClick={decreaseByOne} text='minus'/>
            <Button onClick={setToZero} text='reset'/>
        </div>
    )
}

// left and right
const App3 = () => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([]);

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1);
    }
    const handleRightClick = () => {
        setAll(allClicks.concat('R'));
        setRight(right + 1);
    }

    // 两个hello的作用一致。由于return的是一个单独返回命令，所以可以省略大括号进行简写
    const hello = (who) => () => {
        console.log('hello', who);
    }
    // const hello = (who) => {
    //     return () => console.log('hello', who)
    // }

    return (
        <div>
            {left}
            <Button onClick={handleLeftClick} text='left'/>
            <Button onClick={handleRightClick} text='right'/>
            {right}
            <Histroy allClicks={allClicks}/>
            <button onClick={hello('yeyeye')}>hello</button>
        </div>
    )
}

// setValue
const App4 = () => {
    const [value, setValue] = useState(10);
    const setToValue = (newValue) => {
        setValue(newValue);
    }
    return (
        <div>
            <Display counter={value}/>
            <Button onClick={() => setToValue(1000)} text='thousand'/>
            <Button onClick={() => setToValue(0)} text='reset'/>
            <Button onClick={() => setToValue(value + 1)} text='increment'/>
        </div>
    )
}

export default App4;
