import "./styles/style.css";
import "./styles/style.less";

const buttonView = require( './views/button.js');
const contactsView = require( './views/contactsList.js');

const list = document.getElementById('list');

const contactsList = [
    {name: 'AAA'},
    {name: 'BBB'}
]

const addNewContact = function() {
    contactsList.push( {name: 'CCC'})
    list.innerHTML = contactsView({contacts: contactsList});
}

const init = function() {
    
    list.innerHTML = contactsView({contacts: contactsList});
    
    document.getElementById('buttons').innerHTML = buttonView({id: 'addContact', text: 'button'});
    
    const addButton = document.getElementById('addContact');
    addButton.addEventListener('click', addNewContact);
}

document.addEventListener('DOMContentLoaded', init);
