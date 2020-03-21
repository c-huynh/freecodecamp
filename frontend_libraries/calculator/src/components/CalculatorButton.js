import React from 'react'

const hoverStyle = {
    borderStyle: 'solid',
    borderColor: 'lightblue',
    color: 'lightblue'
}

const inactiveStyle = {
    border: 'none',
    color: 'black'
}

class CalculatorButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false
        }
        this.toggleHover = this.toggleHover.bind(this);
    }
    
    toggleHover() {
        this.setState(state => ({
            hover: !state.hover 
        }))
    }

    render() {
        var handler;
        switch (this.props.className) {
            case 'calculator-btn digit':
                handler = () => this.props.handleClick(this.props.text);
                break;
            case 'calculator-btn operator':
                handler = () => this.props.handleClick(this.props.text);
                break;
            default:
                handler = () => this.props.handleClick();
        }
        
        return (
            <div
                id={this.props.id}
                className={this.props.className}
                onClick={handler}
                style={this.state.hover ? hoverStyle : inactiveStyle}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}>
                {this.props.text}
            </div>
        )
    }
}

export default CalculatorButton