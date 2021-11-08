




let canvasContainer = document.getElementById("cContainer");
let context = canvasContainer.getContext("2d");

// function drawRectangle(rect) {
//     rect.cntx.beginPath();
//     rect.cntx.moveTo(rect.x1, rect.y1);
//     rect.cntx.lineTo(rect.x2, rect.y2);
//     rect.cntx.lineTo(rect.x3, rect.y3);
//     rect.cntx.lineTo(rect.x4, rect.y4);
//     rect.cntx.lineTo(rect.x5, rect.y5);
//     rect.cntx.lineWidth = rect.lineWidth; 
//     rect.cntx.strokeStyle = rect.color;
//     rect.cntx.stroke();   
// }

function drawRectangle(rect) {
    rect.cntx.beginPath();
    rect.cntx.moveTo(rect.c1[0], rect.c1[1]);
    rect.cntx.lineTo(rect.c2[0], rect.c2[1]);
    rect.cntx.lineTo(rect.c3[0], rect.c3[1]);
    rect.cntx.lineTo(rect.c4[0], rect.c4[1]);
    rect.cntx.lineTo(rect.c5[0], rect.c5[1]);
    rect.cntx.lineWidth = rect.lineWidth; 
    rect.cntx.strokeStyle = rect.color;
    rect.cntx.stroke();   
}

function drawShape(params) {
    params.cntx.beginPath();
    params.cntx.moveTo(params.start[0], params.start[1]);
    
//     for (let i = 0; i < params.lines.length; ++i) {
//         params.cntx.lineTo(params.lines[i][0], params.lines[i][1]);
//     }
    
    params.lines.forEach(function(line){
        params.cntx.lineTo(line[0], line[1]);
    });
    
    params.cntx.lineWidth = params.lineWidth; 
    params.cntx.strokeStyle = params.color;
    params.cntx.stroke();   
}

const rectsArray = [
{
    cntx: context,
    c1: [50, 50],
    c2: [50, 100],
    c3: [100, 100],
    c4: [100, 50],
    c5: [50, 50],
    lineWidth: 1,
    color:  'red'
},
{
    cntx: context,
    c1: [150, 50],
    c2: [150, 100],
    c3: [200, 100],
    c4: [200, 50],
    c5: [150, 50],
    lineWidth: 1,
    color:  'green'
},
{
    cntx: context,
    c1: [250, 50],
    c2: [250, 100],
    c3: [300, 100],
    c4: [300, 50],
    c5: [250, 50],
    lineWidth: 1,
    color:  'blue'
}
];

// rectsArray.forEach(function(shape, arrayIndex, shapeArray){
//     drawRectangle(shape);
//     //shapeArray[arrayIndex] === shape;
// });

console.log(`Array1: `,  rectsArray);


// let mappedArray = rectsArray.map(function(shape, arrayIndex){
//     let tmpShapeObject = {
//         cntx: shape.cntx,
//         lineWidth: arrayIndex + 3,
//         color:  shape.color,
//         start: shape.c1,
//         lines: [
//             shape.c2,
//             shape.c3,
//             shape.c4,
//             shape.c5
//         ]
//     }
//     return tmpShapeObject;
// })
// 
// console.log(`mappedArray: `, mappedArray);
// 
// mappedArray = mappedArray.filter(function(shape, arrayIndex){
// //     let result = false;
// //     if (shape.color == 'green') {
// //         result = true;
// //     }
//     return shape.color == 'green' || shape.color == 'blue';
// })

let mappedArray = rectsArray.reduce(function(acc, shape, arrayIndex){
    
    let tmpShapeObject = {
        cntx: shape.cntx,
        lineWidth: arrayIndex + 3,
        color:  shape.color,
        start: shape.c1,
        lines: [
            shape.c2,
            shape.c3,
            shape.c4,
            shape.c5
        ]
    }
    
    if (tmpShapeObject.color == 'red') {
        acc.push(tmpShapeObject);
    }
    
    return acc;
    
    
},  []);

console.log(`mappedArray: `, mappedArray);

mappedArray.forEach(function(shape, arrayIndex, shapeArray){
    drawShape(shape);
});


const rect2 = {
    cntx: context,
    c1: [50, 50],
    c2: [50, 100],
    c3: [100, 100],
    c4: [100, 50],
    c5: [50, 50],
    lineWidth: 1,
    color:  'red'
}

const shape1 = {
    cntx: context,
    start: [150, 50],
    lines: [
        [150, 100],
        [200, 100],
        [200, 50],
        [150, 50],
    ],
    lineWidth: 2,
    color:  'green'
}

const triangle1 = {
    cntx: context,
    start: [275, 250],
    lines: [
        [250, 300],
        [300, 300],
        [275, 250],
    ],
    lineWidth: 3,
    color:  'blue'
}

//drawRectangle(context, 50, 50, 50, 100, 100, 100, 100, 50, 50, 50, 1, 'red');
//drawRectangle(rect1);
//drawRectangle(rect2);

//drawShape(shape1);
//drawShape(triangle1);

// // Рисуем квадраты
// 
// context.beginPath();            // Начинает новый путь
// 
// context.moveTo(50, 50);      // Передвигает перо в точку (x, y)
// 
// context.lineTo(50, 100);       // Рисует линию до точки
// context.lineTo(100, 100);
// context.lineTo(100, 50);
// context.lineTo(50, 50);
// 
// context.lineWidth = 1;          // Устанавливаем толщину линии
// context.strokeStyle = 'red';  // Устанавливаем цвет
// 
// context.stroke();                   // Отображает путь


/*
context.beginPath();

context.moveTo(150, 50);

context.lineTo(150, 100);
context.lineTo(200, 100);
context.lineTo(200, 50);
context.lineTo(150, 50);  

context.lineWidth = 2;
context.strokeStyle = 'green';


context.stroke();*/

/*
context.beginPath();

context.moveTo(250, 50);

context.lineTo(250, 100);
context.lineTo(300, 100);
context.lineTo(300, 50);
context.lineTo(250, 50);  

context.lineWidth = 3;
context.strokeStyle = 'blue'; 

context.stroke();*/


/*
// Рисуем круги

context.beginPath();                                // Начинает новый путь

context.arc(75, 175, 25, 0, 2 * Math.PI); // Рисует круг: x , y , R, fill start, fill end

context.lineWidth = 1;
context.strokeStyle = 'red'; 

context.stroke();                                       // Отображает путь


context.beginPath();

context.arc(175, 175, 25, 0, 2 * Math.PI);

context.lineWidth = 2;
context.strokeStyle = 'green'; 

context.stroke();


context.beginPath();

context.arc(275, 175, 25, 0, 2 * Math.PI);

context.lineWidth = 3;
context.strokeStyle = 'blue'; 

context.stroke();


// Рисуем треугольники

context.beginPath();            // Начинает новый путь

context.moveTo(75, 250);      // Передвигает перо в точку (x, y)

context.lineTo(50, 300);       // Рисует линию до точки
context.lineTo(100, 300);
context.lineTo(75, 250);

context.lineWidth = 1;          // Устанавливаем толщину линии
context.strokeStyle = 'red';  // Устанавливаем цвет

context.stroke();                   // Отображает путь


context.beginPath();

context.moveTo(175, 250);

context.lineTo(150, 300);
context.lineTo(200, 300);
context.lineTo(175, 250);

context.lineWidth = 2;
context.strokeStyle = 'green';


context.stroke();

context.beginPath();

context.moveTo(275, 250);

context.lineTo(250, 300);
context.lineTo(300, 300);
context.lineTo(275, 250);

context.lineWidth = 3;
context.strokeStyle = 'blue'; 

context.stroke();   



*/









const stringArray = [
    'h',
    'e',
    'l',
    'l',
    'o',
];

console.log(`stringArray: `, stringArray);

// stringArray[0] == 'h';
// stringArray[1] == 'e';

const reducedStringArray = stringArray.reduce(function(acc, curr) {
    return acc + curr;
}, '');


console.log(`reducedStringArray: `, reducedStringArray);

const numberArray = [
    1,
    10,
    5,
    3,
];

let preSum = 0;
const summOfNumberArray1 = numberArray.reduce(function(acc, curr) {
    let result = curr + preSum;
    preSum = result;
    acc.push(result);
    return acc;
}, []);

console.log(`summOfNumberArray1: `, summOfNumberArray1);




















