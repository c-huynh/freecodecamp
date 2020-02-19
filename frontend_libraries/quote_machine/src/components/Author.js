import React from 'react'

const Author = (props) => {
    let transitionDuration = 0.8;
    let transitionFunction = 'ease-in-out';
    let color = {
        color: props.color,
        transition: `all ${transitionDuration}s ${transitionFunction}`,
        WebkitTransition: `all ${transitionDuration}s ${transitionFunction}`,
        MozTransition: `all ${transitionDuration}s ${transitionFunction}`
    }
    return (
        <h2 id='author' style={color}>- {props.author}</h2>
    );
}

export default Author