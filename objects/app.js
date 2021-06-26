  // Object.defineProperty(obj, propName, descriptor)
  /*
   descriptor
    Дескриптор – объект, который описывает поведение свойства.

    В нём могут быть следующие поля:

        value – значение свойства, по умолчанию undefined
        writable – значение свойства можно менять, если true. По умолчанию false.
        configurable – если true, то свойство можно удалять, а также менять его в дальнейшем при помощи новых вызовов defineProperty. По умолчанию false.
        enumerable – если true, то свойство просматривается в цикле for..in и методе Object.keys(). По умолчанию false.
        get – функция, которая возвращает значение свойства. По умолчанию undefined.
        set – функция, которая записывает значение свойства. По умолчанию undefined.

    Чтобы избежать конфликта, запрещено одновременно указывать значение value и функции get/set. Либо значение, либо функции для его чтения-записи, одно из двух. Также запрещено и не имеет смысла указывать writable при наличии get/set-функций.
   */

  
// Объявление классов через функцию - конструктор

// Родитель
function SquareFunc(width) {
    this.width = +(width || 0); // Собственное свойство с инициализацией
    Object.defineProperty(this, 'area', { // Вычисляемое свойство
        get: function() {
            return this.width * this.width;
        },
        configurable: true // Разрешает переопределение в потомках
    });
}

let squareFunc = new SquareFunc( 100 );

console.log(`squareFunc: ` , squareFunc);
console.log(`squareFunc.area: ` , squareFunc.area);

// Потомок
function RectangleFunc(width, height) {
    this.height = +(height || 0); // Собственное свойство с инициализацией
    SquareFunc.call(this, width); // Вызов конструктора родителя
    Object.defineProperty(this, 'area', { // Переопределение вычисляемого свойства
        get: function() {
            return this.width * this.height;
        },
        configurable: true // Разрешает переопределение в потомках
    });
}

let rectangleFunc = new RectangleFunc( 100, 200 );

console.log(`rectangleFunc: ` , rectangleFunc);
console.log(`rectangleFunc.area: ` , rectangleFunc.area);

// Потомок  от потомка
function CubeFunc(width, height, depth) {
    this.depth = +(depth || 0); // Собственное свойство с инициализацией
    RectangleFunc.call(this, width, height); // Вызов конструктора родителя
    Object.defineProperty(this, 'area', { // Переопределение вычисляемого свойства
        get: function() {
            return (this.width * this.height + this.height * this.depth + this.width * this.depth) * 2
        }
    })
}

let cubeFunc = new CubeFunc( 100, 200, 300 );

console.log(`cubeFunc: ` , cubeFunc);
console.log(`cubeFunc.area: ` , cubeFunc.area);



// Объявление классов через нотацию ES6

// Родитель
class Square {
    constructor(width) { // Инициализация собственного свойства
        this.width = +(width || 0);
    };
    get area() {
        return this.width * this.width;
    };  //configurable: true указывать уже не нужно, свойство попадёт в prototype
}

let square = new Square(100);
console.log(`square: ` , square);
console.log(`square.area: ` , square.area);

// Потомок
class Rectangle extends Square {
    constructor(width, height) {
        super(width); // Вызов конструктора родителя, аналог Square.call(this, width);
        this.height = +(height || 0); // Инициализация собственного свойства
    };
    get area() {
        return this.width * this.height;
    };
}

// Потомок  от потомка
class Cube extends Rectangle {
    depth = 100; // Собственное свойство, значение по умолчанию
    constructor(width, height, depth) {
        super(width, height); // Вызов конструктора родителя, аналог  Rectangle.call(this, width, height);
        this.depth = +(depth || this.depth); // Инициализация собственного свойства
    };
    get area() {
        return (this.width * this.height + this.height * this.depth + this.width * this.depth) * 2;
    };
}

let rectangle = new Rectangle( 100, 200 );

console.log(`rectangle: ` , rectangle);
console.log(`rectangle.area: ` , rectangle.area);

let cube = new Cube( 100, 200, 300 );


console.log(`cube: ` , cube);
console.log(`cube.area: ` , cube.area);

const init = function(){
    
    console.log(`init: ` );
    
    let closure = 'Просто замыкание';
    
    const squareFielset = document.getElementById('squareFieldset');
    const squareWidth =  squareFielset.querySelector('#width');
    const squareArea =  squareFielset.querySelector('#area');
    
    const clickHandlerSquare = function(event) {
        console.log(`clickHandlerSquare clousure: `, closure );
        const square = new Square(squareWidth.value);
        
        squareArea.value = square.area;
    }
    
    const calcSquareButton =  squareFielset.querySelector('#calculate');
    calcSquareButton.addEventListener('click', clickHandlerSquare);
    
    const rectangleFielset = document.getElementById('rectangleFieldset');
    
    const rectangleWidth =  rectangleFielset.querySelector('#width');
    const rectangleHeight =  rectangleFielset.querySelector('#height');
    const rectangleArea =  rectangleFielset.querySelector('#area');
    
    
    const clickHandlerRectangle = function(event) {
        console.log(`clickHandlerRectangle clousure: `, closure );
        const width =  +rectangleWidth.value;
        const height =  +rectangleHeight.value;
        
        //rectangleArea.value = width * height;
        const rectangle = new Rectangle(width, height);
        rectangleArea.value = rectangle.area;
    }
    
    const calcRectangleButton = rectangleFielset.querySelector('#calculate');
    calcRectangleButton.addEventListener('click', clickHandlerRectangle);
    
    
    const сubeFieldset = document.getElementById('сubeFieldset');
    
    const сubeWidth =  сubeFieldset.querySelector('#width');
    const сubeHeight =  сubeFieldset.querySelector('#height');
    const сubeDepth =  сubeFieldset.querySelector('#depth');
    const сubeArea =  сubeFieldset.querySelector('#area');
    
    const clickHandlerCube = function(event) {
        console.log(`clickHandlerSquare clousure: `, closure );
        const width =  +сubeWidth.value;
        const height =  +сubeHeight.value;
        const depth =  +сubeDepth.value;
        //сubeArea.value = (width * height + height * depth + width * depth) * 2;
        const cube = new Cube(width, height, depth);
        сubeArea.value = cube.area;
    }
    
    const calcCubeButton =  сubeFieldset.querySelector('#calculate');
    calcCubeButton.addEventListener('click', clickHandlerCube) 
}


if (document.readyState === 'loading') {  // Загрузка ещё не закончилась
  document.addEventListener('DOMContentLoaded', init);
} else {  // `DOMContentLoaded` Уже сработал
  init();
}
