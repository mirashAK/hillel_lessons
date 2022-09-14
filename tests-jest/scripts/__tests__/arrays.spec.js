'use strict';

const { implReduce, bubleSort } = require('../arrays.js');

test('Reduce standard implementation', () => {
    expect([1,2,3,3,2,1].reduce((acc, curr, idx)=>{
        return acc + curr;
    }, 0)).toBe(12);
    expect([1,2,3,3,2,1].reduce((acc, curr, idx)=>{
        if (curr > 2) acc.push(curr);
        return acc;
    }, [])).toStrictEqual([3,3]);
});

Array.prototype.myReduce = implReduce;
test('Reduce custom implementation', () => {
    expect([1,2,3,3,2,1].myReduce((acc, curr, idx)=>{
      return acc + curr
    }, 0)).toBe(12);
    expect([1,2,3,3,2,1].myReduce((acc, curr, idx)=>{
        if (curr > 2) acc.push(curr);
        return acc;
    }, [])).toStrictEqual([3,3]);
});

const compare = function (a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}
    
test('Sort standard implementation', () => {
    expect([1,2,3,3,2,1].sort(compare)).toStrictEqual([1,1,2,2,3,3]);
});

Array.prototype.bubleSort = bubleSort;
test('Sort custom implementation', () => {
    expect([1,2,3,3,2,1].bubleSort(compare)).toStrictEqual([1,1,2,2,3,3]);
});
