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
            breakLength: defaultBreakLength * 60,
            sessionLength: defaultSessionLength * 60,
            currentType: defaultType,
            currentTime: defaultSessionLength * 60
        }
        
        this.incrementBreak = this.incrementBreak.bind(this);
        this.decrementBreak = this.decrementBreak.bind(this);
        this.incrementSession = this.incrementSession.bind(this);
        this.decrementSession = this.decrementSession.bind(this);
        this.startStop = this.startStop.bind(this);
        this.reset = this.reset.bind(this);
        this.countdown = this.countdown.bind(this);
        this.toggleCurrentType = this.toggleCurrentType.bind(this);
    }
    
    incrementBreak() {
        if (this.state.breakLength < 60 * 60) {
            this.setState(state => ({
                breakLength: state.breakLength + 60,
                currentTime: state.currentType === 'break'
                    ? state.breakLength + 60
                    : state.currentTime
            }))
        }
    }
    
    decrementBreak() {
        if (this.state.breakLength > 60) {
            this.setState(state => ({
                breakLength: state.breakLength - 60,
                currentTime: state.currentType === 'break'
                    ? state.breakLength - 60
                    : state.currentTime
            }))
        }
    }
    
    incrementSession() {
        if (this.state.sessionLength < 60 * 60) {
            this.setState(state => ({
                sessionLength: state.sessionLength + 60,
                currentTime: state.currentType === 'session'
                    ? state.sessionLength + 60
                    : state.currentTime
            }))
        }
    }
    
    decrementSession() {
        if (this.state.sessionLength > 60) {
            this.setState(state => ({
                sessionLength: state.sessionLength - 60,
                currentTime: state.currentType === 'session'
                    ? state.sessionLength - 60
                    : state.currentTime
            }))
        }
    }
    
    toggleCurrentType() {
        this.setState(state => ({
            currentType: state.currentType === 'session'
                ? 'break'
                : 'session',
            currentTime: state.currentType === 'session'
                ? state.breakLength
                : state.sessionLength
        }))
    }
    
    countdown() {
        this.setState(state => ({
            currentTime: state.currentTime - 1
        }), () => {
            if (this.state.currentTime === 0) {
                const beep = document.getElementById('beep');
                beep.currentTime = 0;
                beep.play();
            }
            if (this.state.currentTime === -1) {
                this.toggleCurrentType();
            }
        })
    }
    
    startStop() {
        this.setState(state => ({
            started: !state.started
        }), () => {
            if (this.state.started) {
                this.interval = setInterval(() => {
                    this.countdown();
                }, 1000);
            } else {
                clearInterval(this.interval);
            }
        })
    }
    
    reset() {
        const beep = document.getElementById('beep');
        beep.pause();
        beep.currentTime = 0;
        
        this.setState({
            started: false,
            breakLength: defaultBreakLength * 60,
            sessionLength: defaultSessionLength * 60,
            currentType: defaultType,
            currentTime: defaultSessionLength * 60
        });
        clearInterval(this.interval);
        
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
                    toggleCurrentType = {this.toggleCurrentType}
                    started={this.state.started}
                    type={this.state.currentType}
                    currentTime={this.state.currentTime}/>
                <Controls startStop={this.startStop} reset={this.reset}/>
                <audio id='beep' src='https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3'/>
            </div>
        )
    }
}

export default App;
