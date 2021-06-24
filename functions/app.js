let canvasContainer = document.getElementById("cContainer");
let context = canvasContainer.getContext("2d");

// Рисуем квадраты

context.beginPath();            // Начинает новый путь

context.moveTo(50, 50);      // Передвигает перо в точку (x, y)

context.lineTo(50, 100);       // Рисует линию до точки
context.lineTo(100, 100);
context.lineTo(100, 50);
context.lineTo(50, 50);     

context.lineWidth = 1;          // Устанавливаем толщину линии
context.strokeStyle = 'red';  // Устанавливаем цвет

context.stroke();                   // Отображает путь


context.beginPath();        

context.moveTo(150, 50);   

context.lineTo(150, 100);
context.lineTo(200, 100);
context.lineTo(200, 50);
context.lineTo(150, 50);  

context.lineWidth = 2;    
context.strokeStyle = 'green';


context.stroke();

context.beginPath();        

context.moveTo(250, 50);   

context.lineTo(250, 100);
context.lineTo(300, 100);
context.lineTo(300, 50);
context.lineTo(250, 50);  

context.lineWidth = 3;    
context.strokeStyle = 'blue'; 

context.stroke();      

// Рисуем круги

context.beginPath();

context.arc(75, 175, 25, 0, 2 * Math.PI);

context.lineWidth = 1;    
context.strokeStyle = 'red'; 

context.stroke();



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
