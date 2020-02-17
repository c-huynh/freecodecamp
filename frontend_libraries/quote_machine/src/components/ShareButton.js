import React from 'react'

const ShareButton = (props) => {
    let backgroundColor = {
        backgroundColor: props.color
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