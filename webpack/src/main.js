import "./styles/style.css";

const hello = 'hello';

console.log(hello);

const newH1 = document.createElement("h1");
newH1.innerHTML = "Hello!";

document.querySelector('body').appendChild(newH1);
