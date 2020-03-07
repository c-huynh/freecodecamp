import React from 'react'

const Display = (props) => {
    return (
        <div id="display">
            <h2>
                {props.text}
            </h2>
        </div>
    )
}

export default Display