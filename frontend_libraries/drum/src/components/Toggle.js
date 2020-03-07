import React from 'react'

const Toggle = (props) => {
    return (
        <div>
            <p className="toggle-label">{props.label}</p>
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