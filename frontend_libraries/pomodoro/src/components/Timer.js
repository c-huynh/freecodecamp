import React from 'react';

const Timer = (props) => {
    return (
        <div id="timer">
            <h2 id="timer-label">{props.type}</h2>
            <p id="time-left">{props.currentTime}</p>
        </div>
    )
}

export default Timer;