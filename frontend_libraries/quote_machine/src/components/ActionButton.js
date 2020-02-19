import React from 'react'

const ActionButton = (props) => {
    let transitionDuration = 0.8;
    let transitionFunction = 'ease-in-out';
    let backgroundColor = {
        backgroundColor: props.color,
        transition: `all ${transitionDuration}s ${transitionFunction}`,
        WebkitTransition: `all ${transitionDuration}s ${transitionFunction}`,
        MozTransition: `all ${transitionDuration}s ${transitionFunction}`
    }
    return (
        <button style={backgroundColor} onClick={props.handleClick} id={props.id} className='action-button'>{props.text}</button>
    )
}

export default ActionButton