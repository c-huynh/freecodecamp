import React from 'react'

const Quote = (props) => {
    let transitionDuration = 0.8;
    let transitionFunction = 'ease-in-out';
    let color = {
        color: props.color,
        transition: `all ${transitionDuration}s ${transitionFunction}`,
        WebkitTransition: `all ${transitionDuration}s ${transitionFunction}`,
        MozTransition: `all ${transitionDuration}s ${transitionFunction}`
    }
    return (
        <h1 id='text' style={color}>"{props.quote}"</h1>
    )
}

export default Quote