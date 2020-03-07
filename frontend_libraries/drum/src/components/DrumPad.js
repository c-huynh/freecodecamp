import React from 'react'

const activeStyle = {
    backgroundColor: 'red',
    borderRadius: '10px'
}

const inactiveStyle = {
    backgroundColor: 'grey',
    borderRadius: '10px'
}

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: inactiveStyle
        };
        
        this.activatePad = this.activatePad.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    
    activatePad() {
        if (this.props.powerOn) {
            this.setState({ style: activeStyle });
            setTimeout(() => {
                this.setState({ style: inactiveStyle });
            }, 100)
        }
    }
    
    handleKeyPress(e) {
        if (e.keyCode === this.props.keyCode) {
            this.activatePad();
        }
    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }
    
    render() {
        return (
            <div className="drum-pad" onClick={this.activatePad} style={this.state.style}>{this.props.name}</div>
        )
    }
}

export default DrumPad