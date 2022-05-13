const Mustache = require('mustache');

const defaults = {
    contacts: []
}

const template = 
    `<ul>
        {{#contacts}}
            <li>{{name}}</li>
        {{/contacts}}
    </ul>`;

module.exports = function (params = {}) { 
    params = Object.assign(defaults, params);
    return Mustache.render(template, params);
};
