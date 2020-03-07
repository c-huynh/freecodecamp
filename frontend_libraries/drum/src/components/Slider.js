import React from 'react'

const Slider = (props) => {
    return (
        <div className="slidecontainer">
            <input
                type="range"
                min="1"
                max="100"
                value={props.value}
                className="slider"
                id="myRange"
                onChange={props.handleChange}/>
        </div>
    )
}

export default Slider