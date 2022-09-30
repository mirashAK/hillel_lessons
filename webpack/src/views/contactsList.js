const Mustache = require('mustache');

const defaults = {
    contacts: []
}

const template = 
    `<ul>
        {{#contacts}}
            <li>{{id}}->{{name}}</li>
        {{/contacts}}
    </ul>`;

export  function contactsView (params = {}) { 
    params = Object.assign(defaults, params);
    return Mustache.render(template, params);
};
