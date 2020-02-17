import React from 'react'

class Author extends React.Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <h2 id='author'>- {this.props.author}</h2>
        )
    }
}

export default Author