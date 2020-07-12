/* *
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!) */

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

    suite('Function convertHandler.getNum(input)', function() {

        test('Whole number input', function(done) {
            var input = '32L';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });

        test('Decimal Input', function(done) {
            var input = '0.5km';
            assert.equal(convertHandler.getNum(input), 0.5);
            done();
        });

        test('Fractional Input', function(done) {
            var input = '5/1L'
            assert.equal(convertHandler.getNum(input), 5);
            done();
        });

        test('Fractional Input w/ Decimal', function(done) {
            var input = '2.5/5L'
            assert.equal(convertHandler.getNum(input), 0.5);
            done();
        });
        
        test('Invalid Input (double fraction)', function(done) {
            var input = '5/1/2kg';
            assert.equal(convertHandler.getNum(input), 'invalid number');
            done();
        });
        

        test('No Numerical Input', function(done) {
            var input = '';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });

        test('Invalid Decimal Input (double decimal)', function(done) {
            var input = '0..5km';
            assert.equal(convertHandler.getNum(input), 'invalid number');
            done();
        });
        
        test('Invalid Input (zero value)', function(done) {
            var input = '0kg';
            assert.equal(convertHandler.getNum(input), 'invalid number');
            done();
        });
    });

    suite('Function convertHandler.getUnit(input)', function() {

        test('For Each Valid Unit Inputs', function(done) {
            var input = [
                'gal',
                'l',
                'mi',
                'km',
                'lbs',
                'kg',
                'GAL',
                'L',
                'MI',
                'KM',
                'LBS',
                'KG'
            ];
            
            var expected = [
                'gal',
                'l',
                'mi',
                'km',
                'lbs',
                'kg',
                'gal',
                'l',
                'mi',
                'km',
                'lbs',
                'kg'
            ];
            
            input.forEach(function(ele, i) {
                assert.equal(convertHandler.getUnit(ele), expected[i])
            });
            done();
        });

        test('Unknown Unit Input', function(done) {
            var input = 'MPa';
            assert.equal(convertHandler.getUnit(input), 'invalid unit');
            done();
        });

    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function() {

        test('For Each Valid Unit Inputs', function(done) {
            var input = [
                'gal',
                'l',
                'mi',
                'km',
                'lbs',
                'kg'
            ];
            var expected = [
                'l',
                'gal',
                'km',
                'mi',
                'kg',
                'lbs'
            ];
            input.forEach(function(ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expected[i]);
            });
            done();
        });

    });

    suite('Function convertHandler.spellOutUnit(unit)', function() {

        test('For Each Valid Unit Inputs', function(done) {
            var input = [
                'gal',
                'l',
                'mi',
                'km',
                'lbs',
                'kg'
            ];
            
            var expected = [
                'gallons',
                'liters',
                'miles',
                'kilometers',
                'pounds',
                'kilograms'
            ];
            
            input.forEach(function(ele, i) {
                assert.equal(convertHandler.spellOutUnit(ele), expected[i]);
            });
            done();
        });

    });

    suite('Function convertHandler.convert(num, unit)', function() {

        test('Gal to L', function(done) {
            var input = [5, 'gal'];
            var expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('L to Gal', function(done) {
            var input = [10, 'l'];
            var expected = 10 / 3.78541;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test('Mi to Km', function(done) {
            var input = [10, 'mi'];
            var expected = 10 * 1.60934;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test('Km to Mi', function(done) {
            var input = [10, 'km'];
            var expected = 10 / 1.60934;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test('Lbs to Kg', function(done) {
            var input = [10, 'lbs'];
            var expected = 10 * 0.453592;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test('Kg to Lbs', function(done) {
            var input = [10, 'kg'];
            var expected = 10 / 0.453592;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

    });

});