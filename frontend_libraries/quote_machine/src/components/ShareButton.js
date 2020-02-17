import React from 'react'

class ShareButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <button className='shareButton'>
                <a id={this.props.id} href={this.props.href} target="_blank">
                    <i className={this.props.iconClass}></i>
                </a>
            </button>
        )
    }
}

export default ShareButton