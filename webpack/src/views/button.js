const Mustache = require('mustache');

const defaults = {
    id: 'button1',
    text: 'I am a button'
}

const template = '<button id="{{id}}">{{text}}</button>';

module.exports = function (params = {}) { 
    params = Object.assign(defaults, params);
    return Mustache.render(template, params);
};
