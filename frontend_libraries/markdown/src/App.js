import React from 'react';
import {Remarkable} from 'remarkable';
import Window from './components/Window';
import Topbar from './components/Topbar';
import WindowSizeButton from './components/WindowSizeButton';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorMaximized: false,
            previewerMaximized: false,
            input:
"# Welcome to my React Markdown Previewer!!\n\n\
## This is a sub-heading...\n\
### And here's some other cool stuff:\n\n\
Heres some code, `<div></div>`, between 2 backticks.\n\n\
```\n\
// this is multi-line code:\n\n\
function anotherExample(firstLine, lastLine) {\n\
  if (firstLine == '```' && lastLine == '```') {\n\
    return multiLineCode;\n\
    }\n\
}\n\
```\n\n\
You can also make text **bold**... whoa!\n\
Or _italic_.\n\
Or... wait for it... **_both!_**\n\
And feel free to go crazy ~~crossing stuff out~~.\n\n\
There's also [links](https://www.freecodecamp.com), and\n\
> Block Quotes!\n\n\
And if you want to get really crazy, even tables:\n\n\
Wild Header | Crazy Header | Another Header?\n\
------------ | ------------- | ------------- \n\
Your content can | be here, and it | can be here....\n\
And here. | Okay. | I think we get it.\n\n\
- And of course there are lists.\n\
  - Some are bulleted.\n\
     - With different indentation levels.\n\
        - That look like this.\n\n\n\
1. And there are numbererd lists too.\n\
1. Use just 1s if you want!\n\
1. But the list goes on...\n\
- Even if you use dashes or asterisks.\n\
* And last but not least, let's not forget embedded images:\n\n\
![React Logo w/ Text](https://goo.gl/Umyytc) "
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleInputChange(e) {
        this.setState({input: e.target.value, output: e.target.value});
    }
    
    handleClick(e) {
        let key = e.target.value;
        this.setState(state => ({
            [key]: !state[key]
        }));
    }

    getRawMarkup() {
        const md = new Remarkable('full');
        return {
            __html: md.render(this.state.input)
        };
    }

    render() {
        
        const editorTopbar = (
            <Topbar>
                <p>Editor</p>
                <WindowSizeButton
                    toggle={'editorMaximized'}
                    maximized={this.state.editorMaximized}
                    handleClick={this.handleClick}
                />
            </Topbar>
        );
        
        const previewerTopbar = (
            <Topbar>
                <p>Previewer</p>
                <WindowSizeButton
                    toggle={'previewerMaximized'}
                    maximized={this.state.previewerMaximized}
                    handleClick={this.handleClick}
                />
            </Topbar>
        );
        
        return (<div className='container'>
            <Window maximized={this.state.editorMaximized} siblingMaximized={this.state.previewerMaximized}>
                {editorTopbar}
                <textarea className='window-content' id='editor' onChange={this.handleInputChange} value={this.state.input}/>
            </Window>
            <Window maximized={this.state.previewerMaximized} siblingMaximized={this.state.editorMaximized}>
                {previewerTopbar}
                <div className='window-content' id='preview' dangerouslySetInnerHTML={this.getRawMarkup()}/>
            </Window>
        </div>);
    }
}

export default App;
