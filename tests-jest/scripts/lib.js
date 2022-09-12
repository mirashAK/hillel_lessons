'use strict';

const sum = function (a, b) {
  return a + b;
}

const mult = function (a, b) {
  return a * b;
}

try {
    module.exports = { 
        sum,
        mult 
    };
} catch(e) {
    
}
