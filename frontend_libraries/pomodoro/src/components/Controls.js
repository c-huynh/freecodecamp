import React from 'react';

const Controls = (props) => {
    return (
        <div id="controls">
            <i id="start_stop" onClick={props.startStop} className="control-btn fas fa-play-circle"></i>
            <i id="reset" onClick={props.reset} className="control-btn fas fa-undo-alt"></i>
        </div>
    )
}

export default Controls;