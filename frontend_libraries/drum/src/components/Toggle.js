import React from 'react'

const Toggle = (props) => {
    return (
        <div>
            <h3 className="toggle-label">{props.label}</h3>
            <label className="switch">
                <input
                    onChange={props.handleClick}
                    checked={props.checked}
                    type="checkbox"
                />
                <span className="toggle-slider round"></span>
            </label>
        </div>

    )
}

export default Toggle