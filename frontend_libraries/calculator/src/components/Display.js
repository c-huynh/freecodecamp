import React from 'react'

const Display = (props) => {
    return (
        <div id="display-area">
            <p className="expression">{props.expression}</p>
            <p id="display" className="result">{props.current}</p>
        </div>
    )
}

export default Display