import React from 'react'

class Quote extends React.Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <h1 id='text'>"{this.props.quote}"</h1>
        )
    }
}

export default Quote