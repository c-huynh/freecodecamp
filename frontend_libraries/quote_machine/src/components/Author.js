import React from 'react'

const Author = (props) => {
    let color = {
        color: props.color
    }
    return (
        <h2 id='author' style={color}>- {props.author}</h2>
    );
}

export default Author