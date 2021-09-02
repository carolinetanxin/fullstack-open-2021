import React from 'react'

const Histroy = (props) =>{
    const allClicks = props.allClicks;
    const allClicksLength = allClicks.length;
    if (allClicksLength === 0) {
        return (
            <div>
                the app is used by pressing the buttons.
            </div>
        )
    }
    return (
        <div>
            button press histroy: {props.allClicks.join(' ')}
        </div>
    )
}

export default Histroy;
