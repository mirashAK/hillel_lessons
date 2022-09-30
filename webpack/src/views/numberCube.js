const Mustache = require('mustache');

const defaults = {
    number: 0
}

let positionX = 30;

const template = 
    `<div class="drag-cube" style="left: {{positionX}}px">
        <p> {{number}} </p>
    </div>`;

export  function numberCube (params = {}) { 
    params = Object.assign(defaults, params);
    params.positionX = positionX; 
    positionX += 70;
    return Mustache.render(template, params);
};
