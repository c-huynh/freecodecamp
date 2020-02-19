import React from 'react'

const ShareButton = (props) => {
    let transitionDuration = 0.8;
    let transitionFunction = 'ease-in-out';
    let backgroundColor = {
        backgroundColor: props.color,
        transition: `all ${transitionDuration}s ${transitionFunction}`,
        WebkitTransition: `all ${transitionDuration}s ${transitionFunction}`,
        MozTransition: `all ${transitionDuration}s ${transitionFunction}`
    }
    return (
        <button className='share-button' style={backgroundColor}>
            <a id={props.id} href={props.href} target="_blank" rel="noopener noreferrer">
                <i className={props.iconClass}></i>
            </a>
        </button>
    )
}

export default ShareButton