import React from 'react';

const Timer = (props) =>  {
    
    const defaultStyle = {
        color: 'white'
    }
    const lastTenSecondsStyle = {
        color: 'red'
    }
    
    let minutes = Math.floor(props.currentTime / 60);
    let seconds = props.currentTime % 60;
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    
    return (
        <div id="timer">
            <h2 id="timer-label">{props.type}</h2>
            <p id="time-left" style={props.currentTime <= 10 ? lastTenSecondsStyle : defaultStyle}>
                {minutes + ":" + seconds}
            </p>
            {/* <audio id='beep' src={'../audio/beep-08b.mp3'}/> */}
        </div>
    )
}

export default Timer;