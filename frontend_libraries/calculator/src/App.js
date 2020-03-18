import React from 'react';
import CalculatorButton from './components/CalculatorButton';
import Display from './components/Display';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '0',
            expression: '',
            result: ''
        }
        
        this.handleClear = this.handleClear.bind(this);
        this.handleDigit = this.handleDigit.bind(this);
        this.handleOperator = this.handleOperator.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
        this.handleEquals = this.handleEquals.bind(this);
    }
    
    handleClear() {
        this.setState({
            current: '0',
            expression: '',
            result: ''
        })
    }
    
    handleDigit(digit) {

        let FirstDigitIsZero = /^0/;
        let hasOperator = /[*/+-]/;
        let hasDecimal = /./;
        let isZeroDecimal = /^0./;
        if (!FirstDigitIsZero.test(this.state.expression) || isZeroDecimal.test(this.state.current) || hasOperator.test(this.state.current) || hasDecimal.test(this.state.current)) {
            this.setState(state => ({
                current: hasOperator.test(this.state.current) || state.result !== '' || state.current === '0'
                    ? digit
                    : state.current + digit,
                expression: state.result !== ''
                    ? digit
                    : state.expression + digit,
                result: ''
            }))
        }
    }
    
    handleOperator(operator) {
        if (this.state.current !== '') {
            this.setState(state => ({
                current: operator,
                expression: this.state.result !== ''
                ? state.result + operator
                : state.current === '0'
                ? state.current + operator
                : state.expression + operator,
                result: ''
            }))
        }
    }
    
    handleDecimal() {
        let hasOperator = /[*/+-]/;
        let hasDecimal = /[.]/;
        if (!hasOperator.test(this.state.current)) {
            console.log("test1");
            if (!hasDecimal.test(this.state.current)) {
                console.log("test2");
                this.setState(state => ({
                    current: state.current + '.',
                    expression: state.expression + '.'
                }))
            }
        }
    }
    
    handleEquals() {
        let lastDigit = /\d$/;
        if (lastDigit.test(this.state.expression)) {
            this.setState(state => ({
                current: eval(state.expression),
                result: eval(state.expression)
            }))
        }
    }
    
    render() {
        let displayExpression = this.state.result === ''
            ? this.state.expression
            : this.state.expression + ' = ' + this.state.result
        
        return (
            <div id="calculator">
                <Display current={this.state.current} expression={displayExpression}/>
                <CalculatorButton id="clear" text="AC" className="calculator-btn" handleClick={this.handleClear}/>
                <CalculatorButton id="divide" text="/" className="calculator-btn operator" handleClick={this.handleOperator}/>
                <CalculatorButton id="multiply" text="*" className="calculator-btn operator" handleClick={this.handleOperator}/>
                <CalculatorButton id="add" text="+" className="calculator-btn operator" handleClick={this.handleOperator}/>
                <CalculatorButton id="subtract" text="-" className="calculator-btn operator" handleClick={this.handleOperator}/>
                <CalculatorButton id="zero" text="0" className="calculator-btn digit" handleClick={this.handleDigit}/>
                <CalculatorButton id="one" text="1" className="calculator-btn digit" handleClick={this.handleDigit}/>
                <CalculatorButton id="two" text="2" className="calculator-btn digit" handleClick={this.handleDigit}/>
                <CalculatorButton id="three" text="3" className="calculator-btn digit" handleClick={this.handleDigit}/>
                <CalculatorButton id="four" text="4" className="calculator-btn digit" handleClick={this.handleDigit}/>
                <CalculatorButton id="five" text="5" className="calculator-btn digit" handleClick={this.handleDigit}/>
                <CalculatorButton id="six" text="6" className="calculator-btn digit" handleClick={this.handleDigit}/>
                <CalculatorButton id="seven" text="7" className="calculator-btn digit" handleClick={this.handleDigit}/>
                <CalculatorButton id="eight" text="8" className="calculator-btn digit" handleClick={this.handleDigit}/>
                <CalculatorButton id="nine" text="9" className="calculator-btn digit" handleClick={this.handleDigit}/>
                <CalculatorButton id="decimal" text="." className="calculator-btn" handleClick={this.handleDecimal}/>
                <CalculatorButton id="equals" text="=" className="calculator-btn" handleClick={this.handleEquals}/>
            </div>
        )
    } 
}


export default App;
