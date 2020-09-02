import {americanOnly} from './american-only.js';
import {britishOnly} from './british-only.js';
import {americanToBritishSpelling} from './american-to-british-spelling.js';
import {americanToBritishTitles} from './american-to-british-titles.js';

/*
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/

const translateAmericanToBritishSpelling = str => {
    for (const word in americanToBritishSpelling) {
        str = str.replace(new RegExp('\\b' + word + '\\b', 'gi'), americanToBritishSpelling[word]);
    }
    return str;
}

const translateAmericanToBritishWords = str => {
    for (const word in americanOnly) {
        str = str.replace(new RegExp(`\\b(?<=[^-])(${word})(?=[^-])\\b|^${word}\\b`, 'gi'), americanOnly[word]);
    }
    return str;
}

const translateAmericanToBritishTitles = str => {
    for (const title in americanToBritishTitles) {
        const britishTitle = americanToBritishTitles[title];
        str = str.replace(new RegExp(title, 'gi'), britishTitle.charAt(0).toUpperCase() + britishTitle.slice(1));
    }
    return str;
}

const translateAmericanToBritishTime = str => {
    str = str.replace(new RegExp('((?<=\\b\\d):(?=\\d{2}\\b))|((?<=\\b\\d\\d):(?=\\d{2}\\b))', 'gi'), '.');
    return str;
}

const translateBritishToAmericanWords = str => {
    for (const word in britishOnly) {
        str = str.replace(new RegExp(`\\b(?<=[^-])(${word})(?=[^-])\\b|^${word}\\b`, 'gi'), britishOnly[word]);
    }
    return str;
}

const translateBritishToAmericanSpelling = str => {
    for (const word in americanToBritishSpelling) {
        str = str.replace(new RegExp('\\b' + americanToBritishSpelling[word] + '\\b', 'gi'), word);
    }
    return str;
}

const translateBritishToAmericanTitles = str => {
    for (const title in americanToBritishTitles) {
        str = str.replace(new RegExp(`\\b${americanToBritishTitles[title]}\\b`, 'gi'), title.charAt(0).toUpperCase() + title.slice(1));
    }
    return str;
}

const translateBritishToAmericanTime = str => {
    str = str.replace(new RegExp('((?<=\\b\\d)\.(?=\\d{2}\\b))|((?<=\\b\\d\\d)\.(?=\\d{2}\\b))', 'gi'), ':');
    return str;
}

const translateAmericanToBritish = str => {
    str = translateAmericanToBritishSpelling(str);
    str = translateAmericanToBritishWords(str);
    str = translateAmericanToBritishTitles(str);
    str = translateAmericanToBritishTime(str);
    return str;
}

const translateBritishToAmerican = str => {
    str = translateBritishToAmericanSpelling(str);
    str = translateBritishToAmericanWords(str);
    str = translateBritishToAmericanTitles(str);
    str = translateBritishToAmericanTime(str);
    return str;
}

const handleTranslateBtn = () => {
    const textInputArea = document.querySelector('#text-input');
    const translatedSentenceArea = document.querySelector('#translated-sentence');
    const translator = document.querySelector('#locale-select').value;
    const errorDiv = document.querySelector('#error-msg');
    const input = textInputArea.value;
    var output;
    
    translatedSentenceArea.innerHTML = '';

    
    if (input === '') {
        errorDiv.innerText = 'Error: No text to translate.';
    } else {
        const span = document.createElement('SPAN');
        span.classList.add('highlight');
        
        if (translator === 'american-to-british') {
            output = translateAmericanToBritish(input);
        } else if (translator === 'british-to-american') {
            output = translateBritishToAmerican(input)
        }
        if (input === output) {
            span.innerText = 'Everything looks good to me!';
        } else {
            span.innerText = output;
        }
        translatedSentenceArea.append(span);
    }
}

const handleClearBtn = () => {
    const textInputArea = document.querySelector('#text-input');
    const errorDiv = document.querySelector('#error-msg');
    const translatedSentenceDiv = document.querySelector('#translated-sentence');
    
    textInputArea.value = '';
    errorDiv.innerText = '';
    translatedSentenceDiv.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const translateBtn = document.querySelector('#translate-btn');
    const clearBtn = document.querySelector('#clear-btn');
    
    translateBtn.onclick = handleTranslateBtn;
    clearBtn.onclick = handleClearBtn;
})

try {
    module.exports = {
        translateAmericanToBritish,
        translateBritishToAmerican,
        handleTranslateBtn,
        handleClearBtn
    }
} catch (e) {}