import React from 'react';
import DrumPad from './DrumPad'

const DrumKeys = [
    {
        name: 'Q',
        keyCode: 81
    },
    {
        name: 'W',
        keyCode: 87
    },
    {
        name: 'E',
        keyCode: 69
    },
    {
        name: 'A',
        keyCode: 65
    },
    {
        name: 'S',
        keyCode: 83
    },
    {
        name: 'D',
        keyCode: 68
    },
    {
        name: 'Z',
        keyCode: 90
    },
    {
        name: 'X',
        keyCode: 88
    },
    {
        name: 'C',
        keyCode: 67
    }
]
const DrumPadBank = (props) => {
    return (
        <React.Fragment>
            {DrumKeys.map(item => (
                <DrumPad
                    powerOn={props.powerOn}
                    name={item.name}
                    keyCode={item.keyCode}
                />
            ))}
        </React.Fragment>
    )
}

export default DrumPadBank