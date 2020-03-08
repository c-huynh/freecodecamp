import React from 'react'

const Slider = (props) => {
    return (
        <div className="slidecontainer">
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={props.value}
                className="slider"
                id="myRange"
                onChange={props.handleChange}/>
        </div>
    )
}

export default Slider