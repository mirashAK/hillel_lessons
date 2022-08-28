const MIN_RAND = 0;
const MAX_RAND = 1000;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const init = function(){
    const createButton = document.getElementById('create_button');
    const arrayIElement = document.getElementById('array_i');
    const arrayJElement = document.getElementById('array_j');
    
    const plainTemplate = document.getElementById('plain_array');
    const modifiedTemplate = document.getElementById('modified_array');
    
    const sortButton = document.getElementById('sort_button');
    const updButton = document.getElementById('update_button');
    
    baseArray = [];
    
    const createArray = function(iDim = 0, jDim = 0) {
        let resultArray = [];
        for (let i=0; i<iDim; i++) {
            if (jDim > 0) {
                let subArray = [];
                for (let j=0; j<getRandomIntInclusive(1, jDim); j++) {
                    subArray.push(getRandomIntInclusive(MIN_RAND, MAX_RAND));
                }
                resultArray.push(subArray);
            } else {
                resultArray.push(getRandomIntInclusive(MIN_RAND, MAX_RAND));
            }
        }
        return resultArray;
    }

    const createButtonClick = function(ev) {
        const iDim = 1*arrayIElement.value;
        const jDim = 1*arrayJElement.value;
        
        baseArray = createArray(iDim, jDim);
        
        renderTemplate(plainTemplate, baseArray);
        
        //console.table( baseArray );
    }
    createButton.addEventListener('click', createButtonClick);
    
    
    const renderTemplate = function(tmplEl, tmplArray) {
        
        let thRow = '<tr><th>Index</th>';
        let tdRow = [];
        
        const subArrayMaxLen = tmplArray.reduce((acc, curr)=>{
            if (Array.isArray(curr)) {
                return curr.length > acc ? curr.length : acc;
            }
            return 0;
        }, 0);
        
        if (subArrayMaxLen > 0) {
            let jIdx = 0;
            while (jIdx < subArrayMaxLen) {
                tdRow.push(`<tr><th>${jIdx}</th>`);
                jIdx++;
            }
        } else {
            tdRow = ['<tr><th>Value</th>'];
        }

        tmplArray.forEach((el, idx)=>{
            
            thRow += `<th>${idx}</th>`;
            
            if (Array.isArray(el)) {
                let  jIdx = 0;
                while (jIdx < subArrayMaxLen) {
                    tdRow[jIdx] += `<td>${el[jIdx] ? el[jIdx] : ''}</td>`;
                    jIdx++;
                }
            } else {
                tdRow.push(`<td>${el}</td>`);
            }
        })
        
        tdRow.forEach((tdEl)=>{
            tdEl += '</tr>';
        })
        
        const rows = thRow + '</tr>'  + tdRow.join('');
        
        const table = `<table class="results">${rows}</table>`;
        
        tmplEl.innerHTML = table;
    }
    
    const sortButtonClick = function(ev) {
        if (baseArray.length > 0) {
            const compare = function (a, b) {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            }
            let sortedArray = [...baseArray];
            if (Array.isArray(sortedArray[0])) {
                sortedArray.forEach((el, elIdx)=>{
                    if (Array.isArray(el)) el.sort(compare);
                })
            } else {
                sortedArray.sort(compare);
            }
            renderTemplate(modifiedTemplate, sortedArray);
        }
    }
    sortButton.addEventListener('click', sortButtonClick);
    
    const updButtonClick = function(ev) {
        let updArray = [...baseArray];
         
        updArray = updArray.filter((el)=>{
            return el > 100;
        })
        
        console.table(updArray);
        
        let result = updArray.every((el)=>{
            return el > 200;
        })
        
        console.log(`updArray.every: `, result);

        // as Array.filter()
        // acc == previousValue
        // curr == currentValue
        result = updArray.reduce((acc, curr, currIdx)=>{
            console.log(acc, curr, currIdx);
            //debugger;
            if (curr > 100) {
                acc.push(curr);
            }
            return acc;
        }, []);
        
        console.log(`result: `, result);
        renderTemplate(modifiedTemplate, result);
        
        // Sum of al elements
        result = updArray.reduce((acc, curr, currIdx)=>{
            console.log(acc, curr, currIdx);
            //debugger;
            return acc + curr;
        }, 0);
        
        console.log(`result: `, result);
        
        // as Array.some()
        result = updArray.reduce((acc, curr, currIdx)=>{
            console.log(acc, curr, currIdx);
            //debugger;
            return acc ? acc :  curr < 100;
        }, false);
        
        console.log(`result: `, result);
        
    }
    
    updButton.addEventListener('click', updButtonClick);
    
    
    const proto = [1,2,3,3,2,1].reduce((acc, curr, idx)=>{
        console.log(`reduce: `, acc, curr, idx);
        if (curr > 2) acc.push(idx)
        return acc;
    }, [])
    
    console.log(`proto: `, proto );
    
    function implReduce (callback, initVal) {
        let result = initVal;
        const array = this;
        
        console.log(`implReduce`);
        for (let i = 0; i < array.length; i++) {
            result = callback(result, array[i], i);
        }
        
        return result;
    }
    
    Array.prototype.myReduce = implReduce;
    
    const test = [1,2,3,3,2,1].myReduce((acc, curr, idx)=>{
        console.log(`myReduce: `, acc, curr, idx);
        if (curr > 2) acc.push(idx)
        return acc;
    }, []);
    
    console.log(`test: `, test );
    
}

if (document.readyState === 'loading') {  // Загрузка ещё не закончилась
  document.addEventListener('DOMContentLoaded', init);
} else {  // `DOMContentLoaded` Уже сработал
  init();
}
