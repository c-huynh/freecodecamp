import React from 'react';
import LengthInput from './components/LengthInput';
import Timer from './components/Timer';
import Controls from './components/Controls';

const defaultBreakLength = 5;      // minutes
const defaultSessionLength = 25;   // minutes
const defaultType = 'session';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            started: false,
            breakLength: defaultBreakLength,
            sessionLength: defaultSessionLength,
            currentType: defaultType,
            currentTime: defaultSessionLength
        }
        
        this.incrementBreak = this.incrementBreak.bind(this);
        this.decrementBreak = this.decrementBreak.bind(this);
        this.incrementSession = this.incrementSession.bind(this);
        this.decrementSession = this.decrementSession.bind(this);
        this.startStop = this.startStop.bind(this);
        this.reset = this.reset.bind(this);
        this.tick = this.tick.bind(this);
    }
    
    incrementBreak() {
        if (this.state.breakLength < 60) {
            this.setState(state => ({
                breakLength: state.breakLength + 1,
                currentTime: state.currentType === 'break'
                    ? state.breakLength + 1
                    : state.currentTime
            }))
        }
    }
    
    decrementBreak() {
        if (this.state.breakLength > 0) {
            this.setState(state => ({
                breakLength: state.breakLength - 1,
                currentTime: state.currentType === 'break'
                    ? state.breakLength - 1
                    : state.currentTime
            }))
        }
    }
    
    incrementSession() {
        if (this.state.sessionLength < 60) {
            this.setState(state => ({
                sessionLength: state.sessionLength + 1,
                currentTime: state.currentType === 'session'
                    ? state.sessionLength + 1
                    : state.currentTime
            }))
        }
    }
    
    decrementSession() {
        if (this.state.sessionLength > 0) {
            this.setState(state => ({
                sessionLength: state.sessionLength - 1,
                currentTime: state.currentType === 'session'
                    ? state.sessionLength - 1
                    : state.currentTime
            }))
        }
    }
    
    tick() {
        this.setState(state => ({
            currentTime: state.currentTime - 1
        }))
    }
    
    startStop() {
        this.setState(state => ({
            started: !state.started
        }), () => {
            if (this.state.started) {
                this.interval = setInterval(() => {
                    this.tick();
                }, 1000);
            } else {
                clearInterval(this.interval);
            }
        })
    }
    
    reset() {
        this.setState({
            started: false,
            breakLength: defaultBreakLength,
            sessionLength: defaultSessionLength,
            currentType: defaultType,
            currentTime: defaultSessionLength
        })
    }
    
    render() {
        return (
            <div id="container">
                <h1>Pomodoro Clock</h1>
                <div id="input-section">
                    <LengthInput
                        type="break"
                        length={this.state.breakLength}
                        increment={this.incrementBreak}
                        decrement={this.decrementBreak}/>
                    <LengthInput
                        type="session"
                        length={this.state.sessionLength}
                        increment={this.incrementSession}
                        decrement={this.decrementSession}/>
                </div>
                <Timer
                    type={this.state.currentType}
                    currentTime={this.state.currentTime}
                    handleTimer={this.handleTimer}/>
                <Controls startStop={this.startStop} reset={this.reset}/>
            </div>
        )
    }
}

export default App;
