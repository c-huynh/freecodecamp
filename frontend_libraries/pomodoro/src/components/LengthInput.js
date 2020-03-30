import React from 'react';

const LengthInput = (props) => {
    const labelID = props.type + "-label";
    const label = props.type + " length";
    const decrementID = props.type + "-decrement";
    const incrementID = props.type + "-increment";
    
    return (
        <div className="length-input">
            <h2 id={labelID} className="label">{label}</h2>
            <div className="input-btn-area">
                <i id={decrementID} onClick={props.decrement} className="arrow-btn fas fa-arrow-circle-down"></i>
                <h3 className="length">{props.length}</h3>
                <i id={incrementID} onClick={props.increment} className="arrow-btn fas fa-arrow-circle-up"></i>
            </div>
        </div>
    )
}

export default LengthInput;