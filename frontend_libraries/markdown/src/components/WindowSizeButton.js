import React from 'react';

const WindowSizeButton = (props) => {
    return (<button className='size-btn' onClick={props.handleClick} value={props.toggle}>
            {props.maximized ? '-': '+'}
        </button>)
}

export default WindowSizeButton;
