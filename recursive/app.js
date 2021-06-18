
let primaryObj = {
    name: 'primaryObj',
    text: 'my Text',
    inArray: [
        'A', 'B', 'C'
    ],
    inObj: {
        a: 'a',
        b: 'b',
        c: 'c',
        d: {
          e: 'e',
          f: 'f'
        }
    },
    inArrOfObj: [
        {id: '1', text: 'text_1'},
        {id: '2', text: 'text_2'},
    ]
}

let filterObj = {
    name: 'primaryObj',
    inObj: {
        a: '',
        d: {
          f: 'f'
        }
    },
    inArrOfObj: [
        {id: ''},
        {id: ''}
    ]
}
const reduceObj = (sourceObj, checkObj) => {
  return Object.entries(sourceObj)
  .filter(([key]) => {
    return Object.keys(checkObj).indexOf(key) > -1
  })
  .reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value)) {
        if (value.length && typeof value[0] == 'object') {
          value = value.map((vObj)=>{
            return reduceObj(vObj, checkObj[key][0]);
          })
        }
      }
      else if (typeof value == 'object') {
        value = reduceObj(value, checkObj[key]);
      }
      return Object.assign(acc, { [key]: value })
    },
    {},
  );
}


console.log('primaryObj', primaryObj);
console.log('filterObj', filterObj);
console.log('reduceObj', reduceObj(primaryObj, filterObj))