import React from 'react'

const Display = (props) => {
    return (
        <div id="display">
            <p className="expression">{props.expression}</p>
            <p className="result">{props.current}</p>
        </div>
    )
}

export default Display