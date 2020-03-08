import React from 'react';
import Display from './components/Display';
import Toggle from './components/Toggle';
import Slider from './components/Slider';
import DrumPadBank from './components/DrumPadBank';

const bankOne = [
    {
        key: 'Q',
        keyCode: 81,
        id: 'Heater-1',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        key: 'W',
        keyCode: 87,
        id: 'Heater-2',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        key: 'E',
        keyCode: 69,
        id: 'Heater-3',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        key: 'A',
        keyCode: 65,
        id: 'Heater-4',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        key: 'S',
        keyCode: 83,
        id: 'Clap',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        key: 'D',
        keyCode: 68,
        id: 'Open-HH',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        key: 'Z',
        keyCode: 90,
        id: "Kick-n'-Hat",
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        key: 'X',
        keyCode: 88,
        id: 'Kick',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        key: 'C',
        keyCode: 67,
        id: 'Closed-HH',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
]

const bankTwo = [
    {
        key: 'Q',
        keyCode: 81,
        id: 'Chord-1',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
        key: 'W',
        keyCode: 87,
        id: 'Chord-2',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
        key: 'E',
        keyCode: 69,
        id: 'Chord-3',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
        key: 'A',
        keyCode: 65,
        id: 'Shaker',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
        key: 'S',
        keyCode: 83,
        id: 'Open-HH',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
        key: 'D',
        keyCode: 68,
        id: 'Closed-HH',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
        key: 'Z',
        keyCode: 90,
        id: 'Punchy-Kick',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
        key: 'X',
        keyCode: 88,
        id: 'Side-Stick',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
        key: 'C',
        keyCode: 67,
        id: 'Snare',
        src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            powerToggleChecked: true,
            bankToggleChecked: false,
            displayText: '',
            sliderValue: "0.5",
            currentBank: bankOne
        }
        
        this.handlePowerToggle = this.handlePowerToggle.bind(this);
        this.handleBankToggle = this.handleBankToggle.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);
        this.clearDisplay = this.clearDisplay.bind(this);
        this.adjustVolume = this.adjustVolume.bind(this);
    }
    
    handlePowerToggle() {
        this.setState(state => ({
            powerToggleChecked: !state.powerToggleChecked
        }));
    }
    
    handleBankToggle() {
        this.clearDisplay()
        this.setState(state => ({
            currentBank: state.bankToggleChecked ? bankTwo : bankOne,
            bankToggleChecked: !state.bankToggleChecked
        }));
    }
    
    handleSliderChange(e) {
        this.setState({sliderValue: e.target.value});
    }
    
    clearDisplay() {
        this.setState({displayText: ''});
    }
    
    updateDisplay(name) {
        this.setState({displayText: name});
    }
    
    adjustVolume(e) {
        this.setState({
            sliderValue: e.target.value,
            displayText: 'Volume - ' + Math.round(e.target.value * 100)
        });
        setTimeout(() => {
            this.setState({
                displayText: ''
            })
        }, 800);
    }
    
    render() {
        return (
            <div id="container">
                <div id="drum-machine">
                    <div id="drum-pad-container">
                        <DrumPadBank 
                            powerOn={this.state.powerToggleChecked}
                            bank={this.state.currentBank}
                            updateDisplay={this.updateDisplay}
                            volume={this.state.sliderValue}/>
                    </div>
                    <div id="controls-container">
                        <Toggle
                            checked={this.state.powerToggleChecked}
                            handleClick={this.handlePowerToggle}
                            label={'Power'}/>
                        <Display
                            text={this.state.powerToggleChecked ? this.state.displayText : ''}/>
                        <Slider
                            value={this.state.sliderValue}
                            handleChange={this.adjustVolume}/>
                        <Toggle
                            checked={this.state.bankToggleChecked}
                            handleClick={this.handleBankToggle}
                            label={'Bank'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
