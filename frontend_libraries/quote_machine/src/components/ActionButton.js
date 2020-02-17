import React from 'react'

class ActionButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <button onClick={this.props.handleClick} id={this.props.id} className='actionButton'>{this.props.text}</button>
        )
    }
}

export default ActionButton