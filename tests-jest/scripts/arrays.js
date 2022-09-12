'use strict';

const implReduce = function(callback, initVal) {
    let result = initVal;
    const array = this;
    
    for (let i = 0; i < array.length; i++) {
        result = callback(result, array[i], i);
    }
    
    return result;
}

function bubleSort (callback) {
    const array = [...this];
    
    //Outer pass
    for(let i = 0; i < array.length; i++){

        //Inner pass
        for(let j = 0; j < array.length - i - 1; j++){

            //Value comparison using ascending order
            if(callback(array[j + 1], array[j]) == -1){ // array[j] > array[j + 1] 
                //Swapping
                //[array[j + 1],array[j]] = [array[j],array[j + 1]]
                const tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
        }
    };
    
    return array;
}

try {
    module.exports = { 
        implReduce,
        bubleSort 
    };
} catch(e) {
    
}
