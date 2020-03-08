import React from 'react'

const activeStyle = {
    backgroundColor: 'lightblue',
}

const inactiveStyle = {
    backgroundColor: 'grey'
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
    
    activatePad(e) {
        if (this.props.powerOn) {
            const sound = document.getElementById(this.props.keyLetter);
            sound.currentTime = 0;
            sound.volume = this.props.volume;
            sound.play();
            this.props.updateDisplay(this.props.clipID);
            this.setState({ style: activeStyle });
            setTimeout(() => {
                this.setState({ style: inactiveStyle });
            }, 100)
        } else {
            this.setState({
                style: {
                    backgroundColor: 'pink'
                }
            });
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
            <div
                id={this.props.keyCode}
                className="drum-pad"
                onClick={this.activatePad}
                style={this.state.style}>
                    {this.props.keyLetter}
                    <audio
                        className="clip"
                        id={this.props.keyLetter}
                        src={this.props.clipSRC}/>
            </div>
        )
    }
}

export default DrumPad