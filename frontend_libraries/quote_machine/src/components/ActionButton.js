import React from 'react'

const ActionButton = (props) => {
    let backgroundColor = {
        backgroundColor: props.color
    }
    return (
        <button style={backgroundColor} onClick={props.handleClick} id={props.id} className='action-button'>{props.text}</button>
    )
}

export default ActionButton