import React from 'react';

const Window = (props) => {
    let displayStyle = {
        display: 'flex'
    }
    
    if (!props.maximized && props.siblingMaximized) {
        displayStyle.display = 'none';
    }
    
    return (
        <div className='window' style={displayStyle}>
            {props.children}
        </div>
    )
}

export default Window;
