import React from 'react';

const Topbar = (props) => {
    return (
        <div className='topbar'>
            {/*<p>{props.name}</p>
        <WindowSizeButton value={'+'}/>*/}
            {props.children}
        </div>
    )
}

export default Topbar;
