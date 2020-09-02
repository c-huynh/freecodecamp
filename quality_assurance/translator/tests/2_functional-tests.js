/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

let Translator;

suite('Functional Tests', () => {
    suiteSetup(() => {
        // DOM already mocked -- load translator then run tests
        Translator = require('../public/translator.js');
    });

    suite('Function handleTranslateBtn()', () => {
        /*
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
        test("Translation appended to the `translated-sentence` `div`", done => {
            const input = 'Tea time is usually around 12 or 12.30.';
            const output = 'Tea time is usually around 12 or 12:30.';
            const translator = document.querySelector('#locale-select')
            const textInputArea = document.querySelector('#text-input');
            const translatedSentenceDiv = document.querySelector('#translated-sentence');

            textInputArea.value = input;
            translator.value = 'british-to-american';
            Translator.handleTranslateBtn();

            assert.equal(translatedSentenceDiv.children.length, 1);
            assert.equal(translatedSentenceDiv.children[0].tagName, 'SPAN');
            assert.equal(translatedSentenceDiv.children[0].classList.contains('highlight'), true);
            assert.equal(translatedSentenceDiv.children[0].innerText, output);
            done();
        });

        /*
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
        test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {
            const input = 'Hello';
            const output = 'Everything looks good to me!';
            const translator = document.querySelector('#locale-select')
            const textInputArea = document.querySelector('#text-input');
            const translatedSentenceDiv = document.querySelector('#translated-sentence');

            textInputArea.value = input;
            translator.value = 'british-to-american';
            Translator.handleTranslateBtn();

            assert.equal(translatedSentenceDiv.children[0].innerText, output);
            done();
        });

        /*
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to
      the `error-msg` `div`.
    */
        test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {
            const input = '';
            const output = 'Error: No text to translate.';
            const translator = document.querySelector('#locale-select')
            const textInputArea = document.querySelector('#text-input');
            const errorDiv = document.querySelector('#error-msg');

            textInputArea.value = input;
            translator.value = 'british-to-american';
            Translator.handleTranslateBtn();

            assert.equal(errorDiv.innerText, output);
            done();
        });

    });

    suite('Function handleClearBtn()', () => {
        /*
        The text area and both the `translated-sentence` and `error-msg`
        `divs` are cleared when the "Clear" button is pressed.
      */
        test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
            const textInputArea = document.querySelector('#text-input');
            const errorDiv = document.querySelector('#error-msg');
            const translatedSentenceDiv = document.querySelector('#translated-sentence');
            
            Translator.handleClearBtn();
            
            assert.equal(textInputArea.value, '');
            assert.equal(errorDiv.innerText, '');
            assert.equal(translatedSentenceDiv.innerHTML, '');
            
            done();
        });

    });

});
