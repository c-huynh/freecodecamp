import React from 'react';
import DrumPad from './DrumPad'

const DrumPadBank = (props) => {
    let bank = props.bank;
    return (
        <React.Fragment>
            {bank.map(item => (
                <DrumPad
                    powerOn={props.powerOn}
                    keyLetter={item.key}
                    keyCode={item.keyCode}
                    key={item.keyCode}
                    clipID={item.id}
                    clipSRC={item.src}
                    volume={props.volume}
                    updateDisplay={props.updateDisplay}
                />
            ))}
        </React.Fragment>
    )
}

export default DrumPadBank