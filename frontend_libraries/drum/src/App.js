import React from 'react';
import Display from './components/Display';
import Toggle from './components/Toggle';
import Slider from './components/Slider';
import DrumPadBank from './components/DrumPadBank';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            powerToggleChecked: true,
            bankToggleChecked: false,
            displayText: 'Test',
            sliderValue: 50
        }
        
        this.handlePowerToggle = this.handlePowerToggle.bind(this);
        this.handleBankToggle = this.handleBankToggle.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }
    
    handlePowerToggle() {
        this.setState(state => ({
            powerToggleChecked: !state.powerToggleChecked
        }));
    }
    
    handleBankToggle() {
        this.setState(state => ({
            bankToggleChecked: !state.bankToggleChecked
        }));
    }
    
    handleSliderChange(e) {
        this.setState({sliderValue: e.target.value});
    } 
    
    render() {
        return (
            <div id="container">
                <div id="drum-machine">
                    <div id="drum-pad-container">
                        <DrumPadBank 
                            powerOn={this.state.powerToggleChecked}/>
                    </div>
                    <div id="controls-container">
                        <Toggle
                            checked={this.state.powerToggleChecked}
                            handleClick={this.handlePowerToggle}
                            label={'power'}/>
                        <Display
                            text={this.state.powerToggleChecked ? this.state.displayText : ''}/>
                        <Slider
                            value={this.state.sliderValue}
                            handleChange={this.handleSliderChange}/>
                        <Toggle
                            checked={this.state.bankToggleChecked}
                            handleClick={this.handleBankToggle}
                            label={'bank'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
