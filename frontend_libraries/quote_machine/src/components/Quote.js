import React from 'react'

const Quote = (props) => {
    let color = {
        color: props.color
    }
    return (
        <h1 id='text' style={color}>"{props.quote}"</h1>
    )
}

export default Quote