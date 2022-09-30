import "./styles/style.css";
import "./styles/style.less";

const buttonView = require('./views/button.js');
// const contactsView = require('./views/contactsList.js');
//import {contactsView} from './views/contactsList.js';
import {numberCube} from './views/numberCube.js';

import {getRandomIntInclusive} from './helpers/helper.random.ts';

const app = document.getElementById('app');

class Cube {
    constructor(){
      this.name = 'Cube';
    }
    
    getName = function () {
      console.log(`getName.this: `,  this);
      console.log(`getName.args: `, arguments);
      return this.name;
    }
    
    //getName() 
    getNameArrow = ()=>{
      console.log(`getNameArrow.this: `, this);
      return this.name;
    }
}

const cube = new Cube();
console.log(`cube.name: `, cube.getName());

const renderCubes = function(count) {
    
    let cubes = '';
    while (count--) {
        cubes += numberCube({number: getRandomIntInclusive(-10, 100)})
    }
    
    app.innerHTML = cubes;
}


const init = function() {
    
    renderCubes(10);
    const elements = document.querySelectorAll('.drag-cube');
    elements.forEach((el)=>{
        dragElement(el, ()=>{cube.getName()}/*.bind(cube)*/, cube.getNameArrow);
    })
  
}

function dragElement(elmnt, callback, callback2) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  //elmnt.addEventListener('mousedown', dragMouseDown);
  elmnt.onmousedown = dragMouseDown;
  
  function dragMouseDown(e) {
    console.log(`window: `, window.event);
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    console.log(`this: `, this);
    if (callback) console.log('callback()', callback());
    if (callback2) console.log('callback2()', callback2());
  }

  function elementDrag(e) {
    
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.addEventListener('DOMContentLoaded', init);
