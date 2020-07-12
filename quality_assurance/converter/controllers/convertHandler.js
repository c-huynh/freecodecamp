/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    var indexOfUnit = input.search(/[a-zA-Z]/);
    var value = input.slice(0, indexOfUnit);
    
    // no value given
    if (value === '') return 1;
    
    // double fraction e.g. '5/2/3'
    if (value.match(/\//g)) {
        if (value.match(/\//g).length > 1) return 'invalid number';
    };
    
    try {
        result = Number(eval(value).toFixed(5));
    } catch(err) {
        return 'invalid number';
    };
    
    if (result === 0) return 'invalid number';
    
    return result;
  };
  
  this.getUnit = function(input) {
    var result;
    var indexOfUnit = input.search(/[a-zA-Z]/);
    var unit = input.slice(indexOfUnit, input.lenth).toLowerCase();
    
    const units = ['l', 'gal', 'mi', 'km', 'kg', 'lbs'];
    
    index = units.indexOf(unit);
    if (index === -1) return 'invalid unit';
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    var unitConversion = {
        'gal': 'l',
        'l': 'gal',
        'mi': 'km',
        'km': 'mi',
        'lbs': 'kg',
        'kg': 'lbs'
    };
    return unitConversion[initUnit];
  };

  this.spellOutUnit = function(unit) {
    var units = {
        'gal': 'gallons',
        'l': 'liters',
        'mi': 'miles',
        'km': 'kilometers',
        'lbs': 'pounds',
        'kg': 'kilograms'
    };
    
    return units[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    const conversionFactors = {
        'gal': galToL,
        'l': 1 / galToL,
        'lbs': lbsToKg,
        'kg': 1 / lbsToKg,
        'mi': miToKm,
        'km': 1 / miToKm
    }
    
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return 'invalid number and unit';
    } else if (initNum === 'invalid number') {
        return initNum;
    } else if (initUnit === 'invalid unit') {
        return initUnit;
    } else {
        return Number((initNum * conversionFactors[initUnit]).toFixed(5));
    }
    
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (initNum === 'invalid number' || initUnit === 'invalid unit') {
        return 'Error'; 
    } else {
        return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    }
  };
  
}

module.exports = ConvertHandler;
