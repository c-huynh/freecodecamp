import React from 'react';
import ActionButton from './components/ActionButton';
import ShareButton from './components/ShareButton';
import Quote from './components/Quote';
import Author from './components/Author';

const quotes = [
    {
        text: 'Adventure is worthwhile.',
        author: 'Aesop',
        color: '#4287f5'
    }, {
        text: 'Travel isn’t always pretty. It isn’t always comfortable. Sometimes it hurts, it even breaks your heart. But that’s okay. The journey changes you; it should change you. It leaves marks on your memory, on your consciousness, on your heart, and on your body. You take something with you. Hopefully, you leave something good behind.',
        author: 'Anthony Bourdain',
        color: '#2aad61'
    }, {
        text: 'Traveling – it leaves you speechless, then turns you into a storyteller.',
        author: 'Ibn Battuta',
        color: '#ad4d2a'
    }, {
        text: 'The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence.',
        author: 'Confucius',
        color: '#ad2a3e'
    }, {
        text: 'The secret of getting ahead is getting started.',
        author: 'Mark Twain',
        color: '#a62aad'
    }, {
        text: 'If You Are Working On Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You.',
        author: 'Steve Jobs',
        color: '#2a37ad'
    }

];

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            author: '',
            color: ''
        };

        this.getRandomQuote = this.getRandomQuote.bind(this);
    }

    getRandomQuote() {
        var nextState = this.state;
        while (nextState.text === this.state.text) {
            nextState = quotes[Math.floor(Math.random() * quotes.length)];
        }
        this.setState({text: nextState.text, author: nextState.author, color: nextState.color})
    }

    componentDidMount() {
        this.getRandomQuote();
    }

    render() {
        let transitionDuration = 0.8;
        let transitionFunction = 'ease-in-out';
        let backgroundColor = {
            backgroundColor: this.state.color,
            transition: `all ${transitionDuration}s ${transitionFunction}`,
            WebkitTransition: `all ${transitionDuration}s ${transitionFunction}`,
            MozTransition: `all ${transitionDuration}s ${transitionFunction}`
        }

        return (
        <div id='container' style={backgroundColor}>
            <div id='quote-box'>
                <Quote quote={this.state.text} color={this.state.color}/>
                <Author author={this.state.author} color={this.state.color}/>
                <div className='button-area'>
                    <div className='share-button-area'>
                        <ShareButton id={'tweet-quote'} href={'https://www.twitter.com/intent/tweet'} iconClass={'fab fa-twitter'} color={this.state.color}/>
                        <ShareButton id={'tumblr-quote'} href={'https://www.tumblr.com'} iconClass={'fab fa-tumblr'} color={this.state.color}/>
                    </div>
                    <ActionButton id={'new-quote'} text={'New Quote'} handleClick={this.getRandomQuote} color={this.state.color}/>
                </div>
            </div>
        </div>);
    }
}

export default App